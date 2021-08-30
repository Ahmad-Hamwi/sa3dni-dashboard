import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DrawerListItems from "./drawer/DrawerListItems";
import { useSelector } from "react-redux";
import { authSelector } from "../../reducers/app/auth/auth_reducer";
import { Activity } from "../../../infrastructure/model/UserModel";

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
  })
);

type DashboardDrawerAndAppBarProps = {};

const DashboardDrawerAndAppBar: React.FC<DashboardDrawerAndAppBarProps> = ({
  children,
}) => {
  const classes = useStyles();

  const { user } = useSelector(authSelector);

  const handleOnUserActivityChanged = (activity: Activity) => {};

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" className={classes.drawer}>
        <DrawerListItems
          currentUser={user!}
          onUserStatusRequested={handleOnUserActivityChanged}
        />
      </Drawer>
      <div className={classes.main}>{children}</div>
    </div>
  );
};

export default DashboardDrawerAndAppBar;
