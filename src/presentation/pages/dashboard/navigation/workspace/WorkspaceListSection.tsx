import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import AgentsList from "./agents/AgentsList";
import GroupsList from "./groups/GroupsList";
import Invites from "./invites/InvitesList";
import {Routes} from "../../../../route/routes";

const useStyles = makeStyles((theme: Theme) => ({
  tabBar: {
    // width: "60%",
  },

  listSection: {
    position: "relative",
    width: "60%",
  },

  listSectionContent: {
    maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    overflow: "auto",
  },
}));

const WorkspaceListSection = () => {
  const classes = useStyles();

  const location = useLocation();
  let { path } = useRouteMatch();

  let initialIndex =
    location.pathname === path + Routes.AGENTS
      ? 0
      : location.pathname === path + Routes.INVITES
      ? 1
      : location.pathname === path + Routes.GROUPS
      ? 2
      : 0;

  const [tabIndex, setTabIndex] = React.useState(initialIndex);

  return (
    <div className={classes.listSection}>
      <AppBar position="static" variant="outlined" className={classes.tabBar}>
        <Tabs
          value={tabIndex}
          onChange={(e, v) => {
            setTabIndex(v);
          }}
        >
          <Tab label="Agents" component={Link} to={path + Routes.AGENTS} />
          <Tab label="Invites" component={Link} to={path + Routes.INVITES} />
          <Tab label="Groups" component={Link} to={path + Routes.GROUPS} />
        </Tabs>
      </AppBar>
      <div className={classes.listSectionContent}>
        <Switch>
          <Route exact path={path}>
            <Redirect to={path + Routes.AGENTS} />
          </Route>
          <Route path={path + Routes.AGENTS} component={AgentsList} />
          <Route path={path + Routes.INVITES} component={Invites} />
          <Route path={path + Routes.GROUPS} component={GroupsList} />
        </Switch>
      </div>
    </div>
  );
};

export default WorkspaceListSection;
