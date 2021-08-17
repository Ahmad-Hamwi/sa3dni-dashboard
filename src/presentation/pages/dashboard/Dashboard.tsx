import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import DashboardDrawerAndAppBar from "../../components/wrapper/DashboardDrawerAndAppBar";
import { Routes } from "../../route/routes";
import { lazy, Suspense } from "react";
import { TicketLoading } from "../../components/app/loader/TicketLoading";
import {useDispatch} from "react-redux";
import {connectToDashboardSocket} from "../../actions/dashboard_socket_actions";

const Chats = lazy(() => import("./navigation/chats/Chats"));
const Workspace = lazy(() => import("./navigation/workspace/Workspace"));
const Reports = lazy(() => import("../report/Reports"));

const Dashboard = () => {
  let { path } = useRouteMatch();

  const dispatch = useDispatch();

  dispatch(connectToDashboardSocket);

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
        </Switch>
      </Suspense>
    </DashboardDrawerAndAppBar>
  );
};

export default Dashboard;
