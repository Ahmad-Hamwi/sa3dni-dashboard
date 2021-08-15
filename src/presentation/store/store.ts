import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import customizedMiddleware from "./middlewares/default_middleware";
import socketMiddleware from "./middlewares/socket_middleware";

export const store = configureStore({
  reducer: reducers,
  middleware: customizedMiddleware
      .concat(socketMiddleware),
});

export type TStore = ReturnType<typeof store.getState>;
