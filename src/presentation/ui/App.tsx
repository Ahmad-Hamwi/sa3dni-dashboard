import "reflect-metadata";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// import RegisterOwner from "../pages/RegisterOwner";
// import Dashboard from "../pages/dashboard/Dashboard";
import * as Routes from "../route/Routes"
import Login from "./auth/login/component/login";
import {inject} from "../../di/injection";

const App = () => {
  const isUserAuthenticated = false;

  inject();

  return (
    <Router>
      <Switch>
        <Route exact path={Routes.BASE}>
          <Redirect
            to={isUserAuthenticated ? Routes.DASHBOARD : Routes.LOGIN}
          />
        </Route>
        {/*<Route path={Routes.REGISTER_OWNER} component={RegisterOwner} />*/}
        <Route path={Routes.LOGIN} component={Login} />
        {/*<Route path={Routes.DASHBOARD} component={Dashboard} />*/}
      </Switch>
    </Router>
  );
};

export default App;
