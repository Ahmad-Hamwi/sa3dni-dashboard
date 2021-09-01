import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import {
  AccountCircle,
  Assessment,
  Chat,
  Settings,
  SupervisorAccount,
} from "@material-ui/icons";
import { ToggleButton } from "@material-ui/lab";
import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { Routes } from "../../../route/routes";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { Avatar, ListItemText, Menu, MenuItem } from "@material-ui/core";
import { Activity } from "../../../../infrastructure/model/UserModel";
import UserViewModel from "../../../viewmodel/user/UserViewModel";
import { AgentStatusBadge } from "../../agents/AgentStatusBadge";
import { PopupState } from "material-ui-popup-state/core";

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
      color: theme.palette.primary.main,
    },

    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

type DrawerListItemsProps = {
  onUserStatusRequested: (userActivity: Activity) => void;
  currentUser: UserViewModel;
};

const DrawerListItems: FC<DrawerListItemsProps> = (props) => {
  const classes = useStyles();

  // The Path object has the route when the component has been initially rendered.
  const { path } = useRouteMatch();
  // The location object automatically gets updated by the router when the route is changed.
  // and thus, I'm using it for syncronizing the selection of the drawer icons with the current selected route.
  const location = useLocation();

  const popUpState = usePopupState({
    variant: "popper",
    popupId: "USER_ACTIVITY_POPUP",
  });

  return (
    <>
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
                  location.pathname.includes(path + Routes.CHATS)
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
                  location.pathname.includes(path + Routes.WORKSPACE)
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
          to={path + Routes.REPORTS}
        >
          <ToggleButton
            className={classes.selectedDrawerItem}
            selected={location.pathname.includes(path + Routes.REPORTS)}
          >
            <ListItemIcon>
              <Assessment
                className={
                  location.pathname.includes(path + Routes.REPORTS)
                    ? classes.IconSelected
                    : undefined
                }
              />
            </ListItemIcon>
          </ToggleButton>
        </ListItem>
      </List>

      <List>
        <ListItem
          alignItems="center"
          className={classes.drawerItem}
          component={Link}
          to={path + Routes.SETTINGS}
        >
          <ToggleButton
            selected={location.pathname.includes(path + Routes.SETTINGS)}
            className={classes.selectedDrawerItem}
          >
            <ListItemIcon>
              <Settings
                className={
                  location.pathname.includes(path + Routes.SETTINGS)
                    ? classes.IconSelected
                    : undefined
                }
              />
            </ListItemIcon>
          </ToggleButton>
        </ListItem>

        <ListItem alignItems="center" className={classes.drawerItem}>
          <ToggleButton
            className={classes.selectedDrawerItem}
            {...bindTrigger(popUpState)}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
          </ToggleButton>
          <UserActivityMenu
            popUpState={popUpState}
            currentUser={props.currentUser}
            onUserStatusRequested={props.onUserStatusRequested}
          />
        </ListItem>
      </List>
    </>
  );
};

export default DrawerListItems;

type UserStatusMenuProps = {
  popUpState: PopupState;
  onUserStatusRequested: (userActivity: Activity) => void;
  currentUser: UserViewModel;
};

export const UserActivityMenu: FC<UserStatusMenuProps> = (props) => {
  const classes = useStyles();
  const { popUpState, onUserStatusRequested, currentUser } = props;

  const UserAvatar = () => {
    return (
      <Avatar className={classes.avatar}>
        {currentUser.fullName[0].toUpperCase()}
      </Avatar>
    );
  };

  const handleOnUserStatusRequested = (activity: Activity) => {
    popUpState.close();
    onUserStatusRequested(activity);
    console.log(activity);
  };

  const userActivities = [Activity.ACTIVE, Activity.BUSY, Activity.OFFLINE];

  return (
    <Menu {...bindMenu(popUpState)}>
      {userActivities.map((activity) => {
        return (
          <MenuItem
            selected={currentUser.activity === activity}
            onClick={() => handleOnUserStatusRequested(activity)}
          >
            <ListItemIcon>
              <AgentStatusBadge status={activity}>
                <UserAvatar />
              </AgentStatusBadge>
            </ListItemIcon>
            <ListItemText
              primary={
                activity[0].toUpperCase() + activity.slice(1).toLowerCase()
              }
            />
          </MenuItem>
        );
      })}
    </Menu>
  );
};
