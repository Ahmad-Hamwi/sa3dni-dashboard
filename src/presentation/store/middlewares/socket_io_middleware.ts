import { Socket } from "socket.io-client";
import * as actionTypes from "../../actions/reduxsocketio/actionTypes";
import {Middleware, MiddlewareAPI} from "redux";
import ReduxWebSocket from "../../../infrastructure/provider/socket/ReduxWebSocket";
import {Action, Options} from "../../actions/reduxsocketio/types";
import {error} from "../../actions/reduxsocketio/actions";

/**
 * Default middleware creator options.
 * @private
 */
const defaultOptions = {
  dateSerializer: null,
  prefix: actionTypes.DEFAULT_PREFIX,
  reconnectInterval: 2000,
  reconnectOnClose: false,
  reconnectOnError: true,
  serializer: JSON.stringify,
};

/**
 * Create a middleware.
 *
 * @param {Options} rawOptions
 *
 * @returns {Middleware}
 */
const socketIOMiddleware = (rawOptions?: Options): Middleware => {
  const options = { ...defaultOptions, ...rawOptions };
  const { prefix, dateSerializer } = options;
  const actionPrefixExp = RegExp(`^${prefix}::`);

  // Create a new redux websocket instance.
  const reduxWebsocket = new ReduxWebSocket(options);

  // Define the list of handlers, now that we have an instance of ReduxWebSocket.
  const handlers = {
    [actionTypes.WEBSOCKET_CONNECT]: reduxWebsocket.connect,
    [actionTypes.WEBSOCKET_DISCONNECT]: reduxWebsocket.disconnect,
    [actionTypes.WEBSOCKET_SEND]: reduxWebsocket.send,
  };

  // Middleware function.
  return (store: MiddlewareAPI) => (next) => (action: Action) => {
    const { dispatch } = store;
    const { type: actionType } = action;

    // Check if action type matches prefix
    if (actionType && actionType.match(actionPrefixExp)) {
      const baseActionType = action.type.replace(actionPrefixExp, "");
      const handler = Reflect.get(handlers, baseActionType);

      if (action.meta && action.meta.timestamp && dateSerializer) {
        action.meta.timestamp = dateSerializer(action.meta.timestamp);
      }

      if (handler) {
        try {
          handler(store, action);
        } catch (err) {
          dispatch(error(action, err, prefix));
        }
      }
    }

    return next(action);
  };
};

export default socketIOMiddleware;