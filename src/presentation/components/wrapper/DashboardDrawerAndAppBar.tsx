import React, { useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DrawerListItems from "./drawer/DrawerListItems";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      paddingTop: theme.spacing(6),
      width: theme.spacing(8) + 1,
      "& .MuiPaper-root": {
        width: theme.spacing(8) + 1,
        position: "inherit",
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

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        variant="outlined"
        color="secondary"
      >
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" className={classes.drawer}>
        <DrawerListItems />
      </Drawer>
      <div className={classes.main}>{children}</div>
    </div>
  );
};

export default DashboardDrawerAndAppBar;
