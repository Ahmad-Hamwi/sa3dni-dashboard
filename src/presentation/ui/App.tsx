import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { inject } from "../../di/injection";
import { Routes } from "../route/routes";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../ui/auth/login/component/Login"));

const Register = lazy(() => import("../ui/auth/register/component/Register"));

const App = () => {
  const isUserAuthenticated = false;

  inject();

  return (
    <Router>
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
    </Router>
  );
};

export default App;
