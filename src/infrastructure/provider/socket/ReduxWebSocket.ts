import { Dispatch, MiddlewareAPI } from "redux";

import {
  beginReconnect,
  broken,
  closed,
  error,
  message,
  open,
  reconnectAttempt,
  reconnected,
} from "./actions";
import { Action, Serializer, Deserializer } from "./types";
import { io, Socket } from "socket.io-client";

interface ReduxWebSocketOptions {
  prefix: string;
  reconnectInterval: number;
  reconnectOnClose: boolean;
  reconnectOnError: boolean;
  onOpen?: (s: Socket) => void;
  serializer?: Serializer;
  deserializer?: Deserializer;
}

/**
 * ReduxWebSocket
 * @class
 *
 * Manages a WebSocket connection.
 */
export default class ReduxWebSocket {
  // Class options.
  private options: ReduxWebSocketOptions;

  // WebSocket connection.
  private websocket: Socket | null = null;

  // Keep track of how many times we've attempted to reconnect.
  private reconnectCount: number = 0;

  // We'll create an interval to try and reconnect if the socket connection breaks.
  private reconnectionInterval: NodeJS.Timeout | null = null;

  // Keep track of the last connect payload we used to connect, so that when we automatically
  // try to reconnect, we can reuse the previous connect payload.
  private lastConnectPayload: {
    url: string;
    protocols: string[] | undefined;
  } | null = null;

  // Keep track of if the WebSocket connection has ever successfully opened.
  /**
   * WebSocket connect event handler.
   *
   * @param {MiddlewareAPI} store
   * @param {Action} action
   */
  connect = ({ dispatch }: MiddlewareAPI, { payload }: Action) => {
    console.log("connect: ", this);
    this.close();

    const { prefix, deserializer } = this.options;

    this.lastConnectPayload = payload;
    this.websocket = io(payload.url);

    this.websocket.on("disconnect", (reason) => {
      console.log("disconnect: ", reason);
      this.handleClose(dispatch, prefix, new Event(reason));
    });
    this.websocket.on("error", (error) => {
      console.log("here1: ", error);
      this.handleError(dispatch, prefix, error);
    });
    this.websocket.on("connect_error", (error) => {
      console.log("here2: ", error);
      this.handleError(dispatch, prefix, error);
    });
    this.websocket.on("connect", () => {
      this.handleOpen(dispatch, prefix, this.options.onOpen);
    });
    this.websocket.on("message", (event) =>
      this.handleMessage(dispatch, prefix, deserializer, event)
    );
  };

  private hasOpened = false;

  /**
   * Constructor
   * @constructor
   *
   * @param {ReduxWebSocketOptions} options
   */
  constructor(options: ReduxWebSocketOptions) {
    this.options = options;
  }

  /**
   * WebSocket disconnect event handler.
   *
   * @throws {Error} Socket connection must exist.
   */
  disconnect = () => {
    if (this.websocket) {
      this.close();
    } else {
      throw new Error(
        "Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first"
      );
    }
  };

  /**
   * WebSocket send event handler.
   *
   * @param {MiddlewareAPI} _store
   * @param {Action} action
   *
   * @throws {Error} Socket connection must exist.
   */
  send = (_store: MiddlewareAPI, { payload }: Action) => {
    if (this.websocket) {
      if (this.options.serializer) {
        this.websocket.send(this.options.serializer(payload));
      } else {
        throw new Error("Serializer not provided");
      }
    } else {
      throw new Error(
        "Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first"
      );
    }
  };

  /**
   * Handle a close event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {Event} event
   */
  private handleClose = (dispatch: Dispatch, prefix: string, event: Event) => {
    dispatch(closed(event, prefix));

    // Conditionally attempt reconnection if enabled and applicable
    const { reconnectOnClose } = this.options;
    if (reconnectOnClose && this.canAttemptReconnect()) {
      this.handleBrokenConnection(dispatch);
    }
  };

  /**
   * Handle an error event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {Event} event
   */
  private handleError = (dispatch: Dispatch, prefix: string, e: Error) => {
    dispatch(error(null, e, prefix));

    // Conditionally attempt reconnection if enabled and applicable
    const { reconnectOnError } = this.options;
    if (reconnectOnError && this.canAttemptReconnect()) {
      this.handleBrokenConnection(dispatch);
    }
  };

  /**
   * Handle an open event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {(s: Socket) => void | undefined} onOpen
   * @param {Event} event
   */
  private handleOpen = (
    dispatch: Dispatch,
    prefix: string,
    onOpen: ((s: Socket) => void) | undefined
  ) => {
    // Clean up any outstanding reconnection attempts.
    if (this.reconnectionInterval) {
      clearInterval(this.reconnectionInterval);

      this.reconnectionInterval = null;
      this.reconnectCount = 0;

      dispatch(reconnected(prefix));
    }

    // Hook to allow consumers to get access to the raw socket.
    if (onOpen && this.websocket != null) {
      onOpen(this.websocket);
    }

    // Now we're fully open and ready to send messages.
    dispatch(open(prefix));

    // Track that we've been able to open the connection. We can use this flag
    // for error handling later, ensuring we don't try to reconnect when a
    // connection was never able to open in the first place.
    this.hasOpened = true;
  };

  /**
   * Handle a message event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {MessageEvent} event
   */
  private handleMessage = (
    dispatch: Dispatch,
    prefix: string,
    deserializer: Deserializer | undefined,
    event: MessageEvent
  ) => {
    dispatch(message(event, prefix, deserializer));
  };

  /**
   * Close the WebSocket connection.
   * @private
   *
   * @param {number} [code]
   * @param {string} [reason]
   */
  private close = (code?: number, reason?: string) => {
    if (this.websocket) {
      this.websocket.close();

      this.websocket = null;
      this.hasOpened = false;
    }
  };

  /**
   * Handle a broken socket connection.
   * @private
   *
   * @param {Dispatch} dispatch
   */
  private handleBrokenConnection = (dispatch: Dispatch) => {
    const { prefix, reconnectInterval } = this.options;

    this.websocket = null;

    // First, dispatch actions to notify Redux that our connection broke.
    dispatch(broken(prefix));
    dispatch(beginReconnect(prefix));

    this.reconnectCount = 1;

    dispatch(reconnectAttempt(this.reconnectCount, prefix));

    // Attempt to reconnect immediately by calling connect with assertions
    // that the arguments conform to the types we expect.
    this.connect(
      { dispatch } as MiddlewareAPI,
      { payload: this.lastConnectPayload } as Action
    );

    // Attempt reconnecting on an interval.
    this.reconnectionInterval = setInterval(() => {
      this.reconnectCount += 1;

      dispatch(reconnectAttempt(this.reconnectCount, prefix));

      // Call connect again, same way.
      this.connect(
        { dispatch } as MiddlewareAPI,
        { payload: this.lastConnectPayload } as Action
      );
    }, reconnectInterval);
  };

  // Only attempt to reconnect if the connection has ever successfully opened,
  // and we're not currently trying to reconnect.
  //
  // This prevents ongoing reconnect loops to connections that have not
  // successfully opened before, such as net::ERR_CONNECTION_REFUSED errors.
  //
  // This also prevents starting multiple reconnection attempt loops.
  private canAttemptReconnect(): boolean {
    return this.hasOpened && this.reconnectionInterval == null;
  }
}
