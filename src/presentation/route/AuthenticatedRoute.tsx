import { Routes } from "./routes";
import { Redirect, Route } from "react-router-dom";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../reducers/app/auth/auth_reducer";
import { authenticateUser } from "../actions/auth_actions";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { TicketLoading } from "../components/app/loader/TicketLoading";

interface AuthenticatedRouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;

  [rest: string]: any;
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isUserAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated === true ? (
          <Component {...props} />
        ) : isUserAuthenticated === false ? (
          <Redirect to={Routes.LOGIN} />
        ) : (
          <TicketLoading />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
