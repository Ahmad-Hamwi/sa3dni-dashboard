import { DASHBOARD_SOCKET_MESSAGE } from "../../presentation/actions/reduxsocketio/socket_listen_actions";

export interface SocketMessage {
  event: "message";
  payload: {
    action: string;
    payload: any
  };
}
