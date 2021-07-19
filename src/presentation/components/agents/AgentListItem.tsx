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
import { UserRole } from "../../../domain/entity/UserRole";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { PopupState } from "material-ui-popup-state/core";
import { IUser } from "../../../domain/entity/User";
import { AgentRoleItem } from "./AgentRoleItem";
import { AgentStatusBadge } from "./AgentStatusBadge";

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
  onDelete: (id: string) => void;
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

  const handleOnDelete = () => {
    props.onDelete(id);
  };

  return (
    <>
      <ListItem
        button
        className={classes.listItemButton}
        component={Link}
        selected={agentIdFromQueryParams === id}
        to={path + Routes.PARAM_AGENT_ID + "=" + id}
      >
        <AgentStatusBadge status={userStatus}>{avatar}</AgentStatusBadge>
        <ListItemText
          className={classes.listItemText}
          primary={name}
          secondary={email}
        />
        <AgentRoleItem role={role} />
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
            onDelete={handleOnDelete}
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
  onDelete: () => void;
};

const AgentOptionsMenu: FC<AgentOptionsMenuProps> = (props) => {
  const classes = useStyles();

  const handleOnChangeRoleClick = () => {
    setChangeRoleDialogOpen(true);
    props.popupState.close();
  };

  const handleOnDeleteClick = () => {
    props.popupState.close();
    props.onDelete();
  };

  // Change Role Dialog State
  const [isChangeRoleDialogOpen, setChangeRoleDialogOpen] = useState(false);

  return (
    <>
      <Menu {...bindMenu(props.popupState)}>
        <MenuItem onClick={handleOnChangeRoleClick}>Change Role</MenuItem>
        <MenuItem
          onClick={handleOnDeleteClick}
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
  const handleUserRoleItemClicked = (role: UserRole | null) => {
    //redux for changing role...............
    console.log("handling redux");

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
