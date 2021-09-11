import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DrawerListItems from "./drawer/DrawerListItems";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../reducers/app/auth/auth_reducer";
import { Activity } from "../../../infrastructure/model/UserModel";
import { Link } from "react-router-dom";
import { Routes } from "../../route/routes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { logout } from "../../actions/auth_actions";
import UserViewModel from "../../viewmodel/user/UserViewModel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      color: "white",
      backgroundColor:
        theme.palette.primary.dark + theme.palette.secondary.main,
      borderWidth: 0,
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      paddingTop: theme.spacing(6),
      height: "100vh",
      width: theme.spacing(8) + 1,
      "& .MuiPaper-root": {
        width: theme.spacing(8) + 1,
        position: "inherit",
        justifyContent: "space-between",
      },
    },
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
      borderRadius: theme.spacing(3),
    },

    main: {
      flexGrow: 1,
      paddingTop: theme.spacing(6) - 2,
      maxHeight: `100vh`,
    },

    title: {
      flexGrow: 1,
    },

    logoutButton: {
      color: "white",
    },
  })
);

type DashboardDrawerAndAppBarProps = {
  onLogoutRequested: () => void;
  onUserActivityChangedRequested: (activity: Activity) => void;
  currentUser: UserViewModel;
};

const DashboardDrawerAndAppBar: React.FC<DashboardDrawerAndAppBarProps> = ({
  children,
  onLogoutRequested,
  onUserActivityChangedRequested,
  currentUser,
}) => {
  const classes = useStyles();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutRequest = () => {
    setLogoutDialogOpen(true);
    onLogoutRequested();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography className={classes.title} variant="h6" noWrap>
            Dashboard
          </Typography>
          <Typography>{currentUser.fullName}</Typography>
          <Button
            className={classes.logoutButton}
            variant="text"
            onClick={() => setLogoutDialogOpen(true)}
          >
            Logout
          </Button>
          <LogoutConfirmationDialog
            open={logoutDialogOpen}
            onPositive={handleLogoutRequest}
            onNegative={() => setLogoutDialogOpen(false)}
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" className={classes.drawer}>
        <DrawerListItems
          currentUser={currentUser!}
          onUserStatusRequested={onUserActivityChangedRequested}
        />
      </Drawer>
      <div className={classes.main}>{children}</div>
    </div>
  );
};

export default DashboardDrawerAndAppBar;

type LogoutConfirmationDialogProps = {
  open: boolean;
  onPositive: () => void;
  onNegative: () => void;
};

const LogoutConfirmationDialog: FC<LogoutConfirmationDialogProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={() => props.onNegative()}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to log out? Make sure you have no active chats
          currently running
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onNegative()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.onPositive()} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
