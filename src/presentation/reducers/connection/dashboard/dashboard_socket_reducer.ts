import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  dashboardSocketInitialState,
  DashboardSocketState,
} from "./dashboard_socket_state";
import { TStore } from "../../../store/store";
import {
  DASHBOARD_SOCKET_BEGIN_RECONNECT,
  DASHBOARD_SOCKET_BROKEN,
  DASHBOARD_SOCKET_CLOSED,
  DASHBOARD_SOCKET_ERROR,
  DASHBOARD_SOCKET_OPEN,
  DASHBOARD_SOCKET_RECONNECT_ATTEMPT,
  DASHBOARD_SOCKET_RECONNECTED,
} from "../../../actions/reduxsocketio/socket_listen_actions";

const dashboardSocketSlice = createSlice({
  name: "dashboardSocket",
  initialState: dashboardSocketInitialState,
  reducers: {},
  extraReducers: {
    [DASHBOARD_SOCKET_OPEN]: (state: DashboardSocketState) => {
      state.opened = true;
      state.closed = false;
    },

    [DASHBOARD_SOCKET_CLOSED]: (state: DashboardSocketState) => {
      state.opened = false;
      state.closed = true;
    },

    [DASHBOARD_SOCKET_BROKEN]: (state: DashboardSocketState) => {
      state.dropped = true;
      state.reconnecting = false;
    },

    [DASHBOARD_SOCKET_BEGIN_RECONNECT]: (state: DashboardSocketState) => {
      state.dropped = true;
      state.reconnecting = true;
    },

    [DASHBOARD_SOCKET_RECONNECTED]: (state: DashboardSocketState) => {
      if (state.dropped) {
        state.reconnected = true;
      }
      state.dropped = false;
      state.reconnecting = false;
      state.reconnectingAttempts = 0;
    },

    [DASHBOARD_SOCKET_RECONNECT_ATTEMPT]: (state: DashboardSocketState) => {
      state.reconnectingAttempts++;
    },

    [DASHBOARD_SOCKET_ERROR]: (
      state: DashboardSocketState,
      { payload }: PayloadAction<Error>
    ) => {
      console.log("reducer: ", payload);
      state.error = payload;
    },
  },
});

export const dashboardSocketReducer = dashboardSocketSlice.reducer;

export const dashboardSocketSelector = (store: TStore) => store.dashboardSocket;
