import { FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Routes } from "../../route/routes";
import ChatsSatisfactionReports from "./chats/ChatsSatisfactionReports";
import ChatsAvailabilityReports from "./chats/ChatsAvailabilityReports";
import AgentsSatisfactionReports from "./agents/AgentsSatisfactionReports";

const ReportsContent: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={path + Routes.REPORTS_CHATS_SATISFACTION} />
      </Route>
      <Route
        exact
        path={path + Routes.REPORTS_CHATS_SATISFACTION}
        component={ChatsSatisfactionReports}
      />
      <Route
        path={path + Routes.REPORTS_CHATS_AVAILABILITY}
        component={ChatsAvailabilityReports}
      />
      <Route path={path + Routes.REPORTS_AGENT_SATISFACTION} component={AgentsSatisfactionReports} />
    </Switch>
  );
};

export default ReportsContent;
