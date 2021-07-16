import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Typography } from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation,
} from "react-router-dom";
import AgentDetails from "./agents/AgentDetails";
import GroupDetails from "./groups/GroupDetails";
import qs from "qs";
import { Routes } from "../../../../route/routes";

const useStyles = makeStyles((theme: Theme) => ({
  infoTopBar: {
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(6) + 2,
  },

  infoTopBarText: {
    fontWeight: 500,
  },

  infoSectionContent: {
    maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    overflow: "auto",
  },

  infoSection: {
    position: "relative",
    width: "40%",
    minWidth: 640,
  },
}));

interface SelectedAgentQP {
  agentId: number;
}

interface SelectedGroupQP {
  groupId: number;
}

const WorkspaceInfoSection = () => {
  const classes = useStyles();

  const { path } = useRouteMatch();

  const location = useLocation();

  const { agentId: selectedAgentId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { groupId: selectedGroupId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <div className={classes.infoSection}>
      <AppBar
        position="static"
        variant="outlined"
        color="transparent"
        className={classes.infoTopBar}
      >
        <Typography className={classes.infoTopBarText}>
          {location.pathname.includes(Routes.AGENTS)
            ? "Agent Info"
            : location.pathname.includes(Routes.GROUPS)
            ? "Group Info"
            : null}
        </Typography>
      </AppBar>
      <div className={classes.infoSectionContent}>
        <Switch>
          <Route exact path={path}>
            <Redirect to={path + Routes.AGENTS} />
          </Route>
          <Route
            path={path + Routes.AGENTS}
            component={
              selectedAgentId === undefined
                ? () => <></>
                : () => <AgentDetails selectedAgentId={selectedAgentId.toString()} />
            }
          />
          <Route path={path + Routes.INVITES} render={() => <></>} />
          <Route
            path={path + Routes.GROUPS}
            component={
              selectedGroupId === undefined ? () => <></> : GroupDetails
            }
          />
        </Switch>
      </div>
    </div>
  );
};

export default WorkspaceInfoSection;
