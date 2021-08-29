import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import DashboardDrawerAndAppBar from "../../components/wrapper/DashboardDrawerAndAppBar";
import { Routes } from "../../route/routes";
import { lazy, Suspense, useEffect } from "react";
import { TicketLoading } from "../../components/app/loader/TicketLoading";
import { useDispatch, useSelector } from "react-redux";
import { connectToDashboardSocket } from "../../actions/dashboardsocket/dashboard_socket_actions";
import { dashboardSocketSelector } from "../../reducers/connection/dashboard/dashboard_socket_reducer";
import { authSelector } from "../../reducers/app/auth/auth_reducer";
import Settings from "./navigation/settings/Settings";

const Chats = lazy(() => import("./navigation/chats/Chats"));
const Workspace = lazy(() => import("./navigation/workspace/Workspace"));
const Reports = lazy(() => import("../report/Reports"));

const Dashboard = () => {
  let { path } = useRouteMatch();

  const dispatch = useDispatch();

  const { token } = useSelector(authSelector);

  useEffect(() => {
    if (token) {
      dispatch(connectToDashboardSocket(token));
    }
  }, [token]);

  const {
    opened,
    error,
    dropped,
    reconnectingAttempts,
    reconnected,
    reconnecting,
    message,
    closed,
  } = useSelector(dashboardSocketSelector);

  useEffect(() => {
    console.log(`opened: ${opened}`);
    console.log(`error: ${error}`);
    console.log(`dropped: ${dropped}`);
    console.log(`reconnectingAttempts: ${reconnectingAttempts}`);
    console.log(`reconnected: ${reconnected}`);
    console.log(`reconnected: ${reconnected}`);
    console.log(`reconnecting: ${reconnecting}`);
    console.log(`message: ${message}`);
    console.log(`closed: ${closed}`);
  }, [
    opened,
    error,
    dropped,
    reconnectingAttempts,
    reconnected,
    reconnecting,
    message,
    closed,
  ]);

  return (
    <DashboardDrawerAndAppBar>
      <Suspense fallback={<TicketLoading />}>
        <Switch>
          <Route exact path={path}>
            <Redirect to={path + Routes.CHATS} />
          </Route>
          <Route path={path + Routes.CHATS} component={Chats} />
          <Route path={path + Routes.WORKSPACE} component={Workspace} />
          <Route path={path + Routes.REPORTS} component={Reports} />
          <Route path={path + Routes.SETTINGS} component={Settings} />
        </Switch>
      </Suspense>
    </DashboardDrawerAndAppBar>
  );
}

export default Dashboard;
