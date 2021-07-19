import React, { FC, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  createStyles,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";

import { MoreHoriz, Star, VerifiedUser } from "@material-ui/icons";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import qs from "qs";
import { Routes } from "../../route/routes";
import { UserActiveStatus } from "../../../domain/entity/UserActiveStatus";
import { UserRole } from "../../../domain/entity/UserRole";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { PopupState } from "material-ui-popup-state/core";
import { IUser } from "../../../domain/entity/User";
import { useDispatch } from "react-redux";
import { changeSelectedUserRole } from "../../actions/users_actions";

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

    popUpListItemWarning: {
      color: theme.palette.error.dark,
    },
  })
);

export interface AgentListItemProps {
  agent: IUser;
}

export interface QueryParams {
  agentId: number;
}

const AgentListItem: FC<AgentListItemProps> = (props: AgentListItemProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { path } = useRouteMatch();
  const location = useLocation();

  const { id, name, role, userStatus, email } = props.agent;

  const avatar = <Avatar className={classes.avatar}>{name[0]}</Avatar>;

  const { agentId: agentIdFromQueryParams } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const popUpState = usePopupState({
    variant: "popper",
    popupId: "AGENT_LIST_ITEM_POPUP",
  });

  return (
    <>
      <ListItem
        button
        className={classes.listItemButton}
        component={Link}
        selected={agentIdFromQueryParams === id}
        to={path + Routes.PARAM_AGENT_ID + "=" + id}
      >
        <ListItemIcon className={classes.listItemIcon}>
          {userStatus === UserActiveStatus.ACTIVE ? (
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
          ) : userStatus === UserActiveStatus.BUSY ? (
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
          ) : userStatus === UserActiveStatus.OFFLINE ? (
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
          primary={name}
          secondary={email}
        />
        <Box
          display="flex"
          flexDirection="row"
          mx={theme.spacing(1)}
          alignItems="center"
        >
          {role === UserRole.OWNER ? (
            <Star />
          ) : role === UserRole.ADMIN ? (
            <VerifiedUser />
          ) : null}
          <Typography className={classes.roleText}>
            {role === UserRole.OWNER
              ? "Owner"
              : role === UserRole.ADMIN
              ? "Admin"
              : role === UserRole.AGENT
              ? "Agent"
              : null}
          </Typography>
        </Box>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="options"
            {...bindTrigger(popUpState)}
          >
            <MoreHoriz />
          </IconButton>
          <AgentOptionsMenu
            popupState={popUpState}
            selectedAgent={props.agent}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

type AgentOptionsMenuProps = {
  popupState: PopupState;
  selectedAgent: IUser;
};

const AgentOptionsMenu: FC<AgentOptionsMenuProps> = (props) => {
  const classes = useStyles();

  const handleOnChangeRoleClick = () => {
    setChangeRoleDialogOpen(true);
    props.popupState.close();
  };

  // Change Role Dialog State
  const [isChangeRoleDialogOpen, setChangeRoleDialogOpen] = useState(false);

  return (
    <>
      <Menu {...bindMenu(props.popupState)}>
        <MenuItem onClick={handleOnChangeRoleClick}>Change Role</MenuItem>
        <MenuItem
          onClick={props.popupState.close}
          className={classes.popUpListItemWarning}
        >
          Remove Agent
        </MenuItem>
      </Menu>
      <ChangeRoleDialog
        open={isChangeRoleDialogOpen}
        selectedAgent={props.selectedAgent}
        onDialogClosed={(_) => setChangeRoleDialogOpen(false)}
      />
    </>
  );
};

type ChangeRoleDialogProps = {
  open: boolean;
  selectedAgent: IUser;
  onDialogClosed: (selectedRole: UserRole | null) => void;
};

const ChangeRoleDialog: FC<ChangeRoleDialogProps> = (props) => {
  const dispatch = useDispatch();

  const handleUserRoleItemClicked = (role: UserRole | null) => {
    // if a role has been selected
    if (role) {
      dispatch(changeSelectedUserRole(props.selectedAgent, role));
    }

    props.onDialogClosed(role);
  };

  return (
    <Dialog
      onClose={() => handleUserRoleItemClicked(null)}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">
        Change Role for: {props.selectedAgent.name}
      </DialogTitle>
      <List>
        <ListItem
          selected={props.selectedAgent.role === UserRole.ADMIN}
          button
          onClick={() => handleUserRoleItemClicked(UserRole.ADMIN)}
          key={UserRole.ADMIN}
        >
          <ListItemIcon>
            <VerifiedUser />
          </ListItemIcon>
          <ListItemText primary={"Admin"} />
        </ListItem>
        <ListItem
          selected={props.selectedAgent.role === UserRole.AGENT}
          button
          onClick={() => handleUserRoleItemClicked(UserRole.AGENT)}
          key={UserRole.AGENT}
        >
          <ListItemIcon />
          <ListItemText primary={"Agent"} />
        </ListItem>
      </List>
    </Dialog>
  );
};
export default AgentListItem;
