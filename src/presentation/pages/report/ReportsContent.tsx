import { FC } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Routes } from "../../route/routes";
import ChatsSatisfactionReports from "./chats/ChatsSatisfactionReports";

const ReportsContent: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={path + Routes.REPORTS_CHATS_SATISFACTION}
        component={ChatsSatisfactionReports}
      />
      {/*<Route path={path + Routes.REPORTS_CHATS_AVAILABILITY} component={} />*/}
      {/*<Route path={path + Routes.REPORTS_AGENT_SATISFACTION} component={} />*/}
    </Switch>
  );
};

export default ReportsContent;