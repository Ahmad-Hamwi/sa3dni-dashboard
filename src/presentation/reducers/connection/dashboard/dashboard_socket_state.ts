export interface DashboardSocketState {
  opened: boolean;
  closed: boolean;
  message: any | null;
  dropped: boolean;
  reconnecting: boolean;
  reconnectingAttempts: number;
  reconnected: boolean;
  error: Error | null;
}

export const dashboardSocketInitialState: DashboardSocketState = {
  opened: false,
  closed: true,
  message: null,
  dropped: false,
  reconnecting: false,
  reconnectingAttempts: 0,
  reconnected: false,
  error: null,
};
