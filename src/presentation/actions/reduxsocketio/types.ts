import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from "./actionTypes";
import {Socket} from "socket.io-client";

type Serializer = (
  payload: any
) => string | ArrayBuffer | ArrayBufferView | Blob;

type Deserializer = (message: any) => any;

type ActionType =
  | typeof WEBSOCKET_CLOSED
  | typeof WEBSOCKET_CONNECT
  | typeof WEBSOCKET_DISCONNECT
  | typeof WEBSOCKET_MESSAGE
  | typeof WEBSOCKET_OPEN
  | typeof WEBSOCKET_SEND;

type Action =
  | { type: typeof WEBSOCKET_CLOSED; payload: any; meta?: any }
  | { type: typeof WEBSOCKET_CONNECT; payload: any; meta?: any }
  | { type: typeof WEBSOCKET_DISCONNECT; payload: any; meta?: any }
  | { type: typeof WEBSOCKET_MESSAGE; payload: any; meta?: any }
  | { type: typeof WEBSOCKET_OPEN; payload: any; meta?: any }
  | { type: typeof WEBSOCKET_SEND; payload: any; meta?: any };

type Options = {
  // Defaults to 'REDUX_WEBSOCKET'. Use this option to set a custom action type
  // prefix. This is useful when you're creating multiple instances of the
  // middleware, and need to handle actions dispatched by each middleware instance separately.
  prefix?: string;
  // Defaults to 2000. Amount of time to wait between reconnection attempts.
  reconnectInterval?: number;
  // Defaults to false. If set to true, will attempt to reconnect when conn is closed without error event
  // e.g. when server closes connection
  reconnectOnClose?: boolean;
  // Defaults to true. If set to true, will attempt to reconnect when conn is closed with error event
  reconnectOnError?: boolean;
  // Callback when the WebSocket connection is open. Useful for when you
  // need a reference to the WebSocket instance.
  onOpen?: (socket: Socket) => void;
  // Custom function to serialize your payload before sending. Defaults to JSON.stringify
  // but you could use this function to send any format you like, including binary
  serializer?: (payload: any) => string | ArrayBuffer | ArrayBufferView | Blob;
  // Custom function to deserialize the message data sent from the server. By default the
  // message data gets passed through as is.
  deserializer?: (message: any) => any;
  // Custom function to serialize the timestamp. The default behavior maintains the timestamp
  // as a Date but you could use this function to store it as a string or number.
  dateSerializer?: (date: Date) => string | number;
};

// Huh? https://github.com/babel/babel/issues/6065#issuecomment-453901877
/* eslint-disable no-undef */
// @ts-ignore
export { Action, ActionType, Options, Serializer, Deserializer };
/* eslint-enable no-undef */
