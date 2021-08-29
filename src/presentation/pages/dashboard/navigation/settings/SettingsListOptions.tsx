import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Routes } from "../../../../route/routes";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    listOptions: {
      width: "360px",
    },
  })
);

const SettingsListOptions = () => {
  const classes = useStyles();

  const { path } = useRouteMatch();
  const location = useLocation();

  const openFromRoute = location.pathname.includes("api");

  const [developerOptionsMenuOpen, setDeveloperMenuOptionsOpen] =
    useState<boolean>();

  const handleChatsClick = () => {
    setDeveloperMenuOptionsOpen((prev) => {
      if (prev === undefined && openFromRoute) return false;
      if (prev === undefined && !openFromRoute) return true;
      return !prev;
    });
  };

  let open: boolean;
  if (developerOptionsMenuOpen === undefined) {
    open = openFromRoute;
  } else {
    open = developerOptionsMenuOpen;
  }

  return (
    <List className={classes.listOptions}>
      <ListItem button onClick={handleChatsClick}>
        <ListItemText primary="Developer options" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <ListItem
            selected={location.pathname.includes(Routes.SETTINGS_API)}
            button
            component={Link}
            to={path + Routes.SETTINGS_API}
          >
            <ListItemText
              primary="Workspace Api"
              secondary={
                "Connect your workspace with integrated module using workspace api"
              }
            />
          </ListItem>

          <ListItem
            selected={location.pathname.includes(Routes.SETTINGS_API_DOCS)}
            button
            component={Link}
            to={path + Routes.SETTINGS_API_DOCS}
          >
            <ListItemText
              primary="Workspace Api Docs"
              secondary={
                "Use the workspace api documentation to have a step by step guide to integrate modules in your apps"
              }
            />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default SettingsListOptions;
