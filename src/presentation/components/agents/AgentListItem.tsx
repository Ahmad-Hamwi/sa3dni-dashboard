import { FC } from "react";
import {
  ListItem,
  ListItemIcon,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  ListItemText,
  Box,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  useTheme,
  Divider,
  withStyles,
  Badge,
} from "@material-ui/core";

import { MoreHoriz, Star, VerifiedUser } from "@material-ui/icons";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import qs from "qs";
import { Routes } from "../../route/routes";
import { UserActiveStatus } from "../../../domain/entity/UserActiveStatus";
import { UserRole } from "../../../domain/entity/UserRole";

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
)(Badge);

const BusyBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#D93131",
      color: "#D93131",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const OfflineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#A8A8A8",
      color: "#A8A8A8",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      width: theme.spacing(8),
    },

    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },

    listItemText: {
      "& .MuiTypography-body1": {
        fontWeight: 500,
      },
    },

    roleText: {
      fontWeight: 500,
      padding: theme.spacing(1),
    },

    listItemButton: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    busyBadge: {
      backgroundColor: "#D93131",
      color: "#D93131",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
);

export interface AgentListItemProps {
  id: String;
  name: String;
  email: String;
  role: UserRole;
  status: UserActiveStatus;
}

export interface QueryParams {
  agentId: number;
}

const AgentListItem: FC<AgentListItemProps> = (props: AgentListItemProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { path } = useRouteMatch();
  const location = useLocation();

  const avatar = <Avatar className={classes.avatar}>{props.name[0]}</Avatar>;

  const { agentId: agentIdFromQueryParams } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <>
      <ListItem
        button
        className={classes.listItemButton}
        component={Link}
        selected={agentIdFromQueryParams === props.id}
        to={path + Routes.PARAM_AGENT_ID + "=" + props.id}
      >
        <ListItemIcon className={classes.listItemIcon}>
          {props.status === UserActiveStatus.ACTIVE ? (
            <OnlineBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              variant="dot"
            >
              {avatar}
            </OnlineBadge>
          ) : props.status === UserActiveStatus.BUSY ? (
            <BusyBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              variant="dot"
            >
              {avatar}
            </BusyBadge>
          ) : props.status === UserActiveStatus.OFFLINE ? (
            <OfflineBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              variant="dot"
            >
              {avatar}
            </OfflineBadge>
          ) : null}
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={props.name}
          secondary={props.email}
        />
        <Box
          display="flex"
          flexDirection="row"
          mx={theme.spacing(1)}
          alignItems="center"
        >
          {props.role === UserRole.OWNER ? (
            <Star />
          ) : props.role === UserRole.ADMIN ? (
            <VerifiedUser />
          ) : null}
          <Typography className={classes.roleText}>
            {props.role === UserRole.OWNER
              ? "Owner"
              : props.role === UserRole.ADMIN
              ? "Admin"
              : props.role === UserRole.AGENT
              ? "Agent"
              : null}
          </Typography>
        </Box>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="options">
            <MoreHoriz />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default AgentListItem;
