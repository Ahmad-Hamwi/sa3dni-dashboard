import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { SocketMessage } from "../../../infrastructure/model/socket/SocketMessage";
import { Action } from "../../actions/reduxsocketio/types";
import { WEBSOCKET_MESSAGE } from "../../actions/reduxsocketio/actionTypes";
import {
  DASHBOARD_CHAT_ASSIGNED_SOCKET_EVENT,
  DASHBOARD_CHAT_CLOSED_SOCKET_EVENT,
  DASHBOARD_CHAT_MESSAGE_SOCKET_EVENT,
} from "../../socket/constants";
import {notifyChatAssigned, notifyMessageReceived} from "../../actions/dashboardsocket/dashboard_socket_actions";
import {EventMessageData} from "../../../infrastructure/model/chat/message/data/EventMessageModel";

export default (): Middleware => {
  return (store: MiddlewareAPI) => (next) => (action: Action) => {
    const { dispatch } = store;

    console.log(action);

    if (action.type.includes(WEBSOCKET_MESSAGE)) {

      const socketMessage = action.payload.event as EventMessageData;

      if (socketMessage.action === DASHBOARD_CHAT_MESSAGE_SOCKET_EVENT) {
        dispatch(notifyMessageReceived(socketMessage.payload));
      } else if (
          socketMessage.action === DASHBOARD_CHAT_ASSIGNED_SOCKET_EVENT
      ) {
        dispatch(notifyChatAssigned(socketMessage.payload));
      } else if (
          socketMessage.action === DASHBOARD_CHAT_CLOSED_SOCKET_EVENT
      ) {
      }
    }

    return next(action);
  };
};
