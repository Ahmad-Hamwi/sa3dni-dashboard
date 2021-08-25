import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { SocketMessage } from "../../../infrastructure/model/SocketMessage";
import { Action } from "../../actions/reduxsocketio/types";
import { WEBSOCKET_MESSAGE } from "../../actions/reduxsocketio/actionTypes";
import {
  DASHBOARD_CHAT_ASSIGNED_SOCKET_EVENT,
  DASHBOARD_CHAT_CLOSED_SOCKET_EVENT,
  DASHBOARD_SEND_MESSAGE_SOCKET_EVENT,
} from "../../socket/constants";

export default (): Middleware => {
  return (store: MiddlewareAPI) => (next) => (action: Action) => {
    const { dispatch } = store;

    if (action.type === WEBSOCKET_MESSAGE) {
      const socketMessage = action.payload as SocketMessage;

      const { payload: socketMessagePayload } = socketMessage;

      if (socketMessagePayload.action === DASHBOARD_SEND_MESSAGE_SOCKET_EVENT) {
      } else if (
        socketMessagePayload.action === DASHBOARD_CHAT_ASSIGNED_SOCKET_EVENT
      ) {
      } else if (
        socketMessagePayload.action === DASHBOARD_CHAT_CLOSED_SOCKET_EVENT
      ) {
      }
    }

    return next(action);
  };
};
