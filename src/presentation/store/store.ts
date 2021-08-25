import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import reducers from "./reducers";
import {DASHBOARD_SOCKET_PREFIX} from "./constants";
import socketIOMiddleware from "./middlewares/socket_io_middleware";

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const socketMiddleware = socketIOMiddleware({
  prefix: DASHBOARD_SOCKET_PREFIX,
  reconnectOnError: true,
});

export const store = configureStore({
  reducer: reducers,
  middleware: defaultMiddleware
      .concat(socketMiddleware),
});

export type TStore = ReturnType<typeof store.getState>;
