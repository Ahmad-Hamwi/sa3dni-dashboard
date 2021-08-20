import { Badge, ListItemIcon, withStyles } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {Activity} from "../../../infrastructure/model/UserModel";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    listItemIcon: {
      width: theme.spacing(8),
    },
  });
});

const StatusBadge = (props: any) => (
  <Badge
    overlap="circle"
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    variant="dot"
    {...props}
  />
);

const OnlineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  })
)(StatusBadge);

const BusyBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#D93131",
      color: "#D93131",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(StatusBadge);

const OfflineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#A8A8A8",
      color: "#A8A8A8",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(StatusBadge);

export type AgentStatusBadgeProps = {
  status: Activity;
};

const AgentStatusBadge: FunctionComponent<AgentStatusBadgeProps> = (props) => {
  const classes = useStyles();

  return (
    <ListItemIcon className={classes.listItemIcon}>
      {props.status === Activity.ACTIVE ? (
        <OnlineBadge>{props.children}</OnlineBadge>
      ) : props.status === Activity.BUSY ? (
        <BusyBadge>{props.children}</BusyBadge>
      ) : props.status === Activity.OFFLINE ? (
        <OfflineBadge>{props.children}</OfflineBadge>
      ) : (
        <></>
      )}
    </ListItemIcon>
  );
};

export { AgentStatusBadge };
