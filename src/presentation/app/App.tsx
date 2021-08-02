import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Routes } from "../route/routes";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { TicketLoading } from "../components/app/loader/TicketLoading";
import AuthenticatedRoute from "../route/AuthenticatedRoute";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Join = lazy(() => import("../pages/Join"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<TicketLoading />}>
          <Switch>
            <Route exact path={Routes.BASE}>
              <Redirect to={Routes.DASHBOARD} />
            </Route>
            <Route path={Routes.REGISTER_OWNER} component={Register} />
            <Route path={Routes.REGISTER_AGENT} component={Join} />
            <Route path={Routes.LOGIN} component={Login} />
            <AuthenticatedRoute path={Routes.DASHBOARD} component={Dashboard}/>
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
