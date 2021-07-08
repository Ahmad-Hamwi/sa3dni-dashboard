import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import { Chat, SupervisorAccount } from "@material-ui/icons";
import { ToggleButton } from "@material-ui/lab";
import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouteMatch, Link, useLocation } from "react-router-dom";
import {Routes} from "../../../route/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerItem: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      borderRadius: theme.spacing(4),
      margin: theme.spacing(1),
      justifyContent: "center",

      "& .MuiListItemIcon-root": {
        width: theme.spacing(3),
        height: theme.spacing(3),
        minWidth: theme.spacing(3),
      },
    },

    selectedDrawerItem: {
      border: 0,
      borderRadius: theme.spacing(3),
      "&.MuiToggleButton-root.Mui-selected": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    IconSelected: {
      color: "black",
    },
  })
);

const DrawerListItems = () => {
  const classes = useStyles();

  // The Path object has the route when the component has been initially rendered.
  let { path } = useRouteMatch();
  // The location object automatically gets updated by the router when the route is changed.
  // and thus, I'm using it for syncronizing the selection of the drawer icons with the current selected route.
  let location = useLocation();

  return (
    <List>
      <ListItem
        alignItems="center"
        className={classes.drawerItem}
        component={Link}
        to={path + Routes.CHATS}
      >
        <ToggleButton
          selected={location.pathname.includes(path + Routes.CHATS)}
          className={classes.selectedDrawerItem}
        >
          <ListItemIcon>
            <Chat
              className={
                location.pathname === path + Routes.CHATS
                  ? classes.IconSelected
                  : undefined
              }
            />
          </ListItemIcon>
        </ToggleButton>
      </ListItem>

      <ListItem
        alignItems="center"
        className={classes.drawerItem}
        component={Link}
        to={path + Routes.WORKSPACE}
      >
        <ToggleButton
          className={classes.selectedDrawerItem}
          selected={location.pathname.includes(path + Routes.WORKSPACE)}
        >
          <ListItemIcon>
            <SupervisorAccount
              className={
                location.pathname === path + Routes.WORKSPACE
                  ? classes.IconSelected
                  : undefined
              }
            />
          </ListItemIcon>
        </ToggleButton>
      </ListItem>
    </List>
  );
};

export default DrawerListItems;
