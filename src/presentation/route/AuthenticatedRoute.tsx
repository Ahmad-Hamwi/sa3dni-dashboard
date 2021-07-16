import { Routes } from "./routes";
import { Redirect, Route } from "react-router-dom";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../app/redux/auth/reducer";
import { authenticateUser } from "../app/redux/auth/actions";
import * as React from "react";
import { RouteComponentProps } from "react-router";

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
          <></>
        )
      }
    />
  );
};

export default AuthenticatedRoute;
