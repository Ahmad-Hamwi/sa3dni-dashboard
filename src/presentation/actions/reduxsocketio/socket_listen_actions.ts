import { DASHBOARD_SOCKET_PREFIX } from "../../store/constants";
import {
  WEBSOCKET_BEGIN_RECONNECT,
  WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_ERROR,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_RECONNECT_ATTEMPT,
  WEBSOCKET_RECONNECTED,
} from "./actionTypes";

// Socket defined, socket.io middleware actions to dispatch
export const DASHBOARD_SOCKET_OPEN = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_OPEN}`;
export const DASHBOARD_SOCKET_CLOSED = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_CLOSED}`;
export const DASHBOARD_SOCKET_MESSAGE = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_MESSAGE}`;
export const DASHBOARD_SOCKET_BROKEN = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_BROKEN}`;
export const DASHBOARD_SOCKET_BEGIN_RECONNECT = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_BEGIN_RECONNECT}`;
export const DASHBOARD_SOCKET_RECONNECT_ATTEMPT = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_RECONNECT_ATTEMPT}`;
export const DASHBOARD_SOCKET_RECONNECTED = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_RECONNECTED}`;
export const DASHBOARD_SOCKET_ERROR = `${DASHBOARD_SOCKET_PREFIX}::${WEBSOCKET_ERROR}`;