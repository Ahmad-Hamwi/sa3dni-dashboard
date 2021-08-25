import { DASHBOARD_SOCKET_PREFIX } from "../../store/constants";

import {
  DASHBOARD_SOCKET_AUTH_QP,
  DASHBOARD_SOCKET_BASE_URL,
} from "../../socket/constants";

import qs from "qs";
import { connect, disconnect } from "../reduxsocketio/actions";

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