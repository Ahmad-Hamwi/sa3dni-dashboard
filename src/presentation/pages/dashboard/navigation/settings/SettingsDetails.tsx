import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Routes } from "../../../../route/routes";
import WorkspaceAPI from "./developeroptions/WorkspaceAPI";
import WorkspaceApiDocs from "./developeroptions/WorkspaceApiDocs";

const SettingsDetails = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path + Routes.SETTINGS_API} component={WorkspaceAPI} />
      <Route
        path={path + Routes.SETTINGS_API_DOCS}
        component={WorkspaceApiDocs}
      />
    </Switch>
  );
};

export default SettingsDetails;
