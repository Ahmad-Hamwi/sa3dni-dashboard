import { DASHBOARD_SOCKET_PREFIX } from "../../store/constants";

import {
  DASHBOARD_SEND_MESSAGE_SOCKET_EVENT,
  DASHBOARD_SOCKET_AUTH_QP,
  DASHBOARD_SOCKET_BASE_URL,
} from "../../socket/constants";

import qs from "qs";
import {connect, disconnect, send} from "../reduxsocketio/actions";

export const connectToDashboardSocket = (token: string) => {
  //compose the query param
  const qp = qs.stringify({
    [DASHBOARD_SOCKET_AUTH_QP]: token,
  });

  //build url
  const fullUrl: string = DASHBOARD_SOCKET_BASE_URL + "?" + qp;

  return connect(fullUrl, DASHBOARD_SOCKET_PREFIX);
};

export const disconnectDashboardSocket = () => {
  return disconnect(DASHBOARD_SOCKET_PREFIX);
};

export const sendTextMessage = (roomId: string, textMessage: string) => {
  const message = {
    event: DASHBOARD_SEND_MESSAGE_SOCKET_EVENT,
    payload: {
      roomId: roomId,
      text: textMessage,
    }
  }

  return send(message, DASHBOARD_SOCKET_PREFIX);
}