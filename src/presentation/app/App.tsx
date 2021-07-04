import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { inject } from "../../di/injection";
import { Routes } from "../route/routes";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const Login = lazy(() => import("../pages/auth/login/Login"));

const Register = lazy(() => import("../pages/auth/register/Register"));

const App = () => {
  const isUserAuthenticated = false;

  inject();

  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Switch>
            <Route exact path={Routes.BASE}>
              <Redirect
                to={isUserAuthenticated ? Routes.DASHBOARD : Routes.LOGIN}
              />
            </Route>
            <Route path={Routes.REGISTER_OWNER} component={Register} />
            <Route path={Routes.LOGIN} component={Login} />
            {/*<Route path={Routes.DASHBOARD} component={Dashboard} />*/}
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
