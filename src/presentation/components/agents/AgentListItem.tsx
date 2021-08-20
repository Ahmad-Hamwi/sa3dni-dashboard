import React, { FC, useState } from "react";
import {
  Avatar,
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
  useTheme,
} from "@material-ui/core";

import { MoreHoriz, VerifiedUser } from "@material-ui/icons";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import qs from "qs";
import { Routes } from "../../route/routes";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { PopupState } from "material-ui-popup-state/core";
import { AgentRoleItem } from "./AgentRoleItem";
import { AgentStatusBadge } from "./AgentStatusBadge";
import UserViewModel from "../../viewmodel/user/UserViewModel";
import {Role} from "../../../infrastructure/model/UserModel";

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
      height: theme.spacing(8),
      "&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
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
  agent: UserViewModel;
  onRoleChanged: (id: string, role: Role) => void;
  onDelete: (user: UserViewModel) => void;
  isCurrentUser: boolean;
}

export interface QueryParams {
  agentId: number;
}

const AgentListItem: FC<AgentListItemProps> = (props: AgentListItemProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { path } = useRouteMatch();
  const location = useLocation();

  const { id, fullName, role, activity, email } = props.agent;

  const avatar = (
    <Avatar className={classes.avatar}>{fullName[0].toUpperCase()}</Avatar>
  );

  const { [Routes.PARAM_AGENT_ID]: agentIdFromQueryParams } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    }
  );

  const popUpState = usePopupState({
    variant: "popper",
    popupId: "AGENT_LIST_ITEM_POPUP",
  });

  const handleOnRoleChanged = (role: Role) => {
    props.onRoleChanged(props.agent.id, role);
  };

  const handleOnDelete = () => {
    props.onDelete(props.agent);
  };

  return (
    <>
      <ListItem
        button
        className={classes.listItemButton}
        component={Link}
        selected={agentIdFromQueryParams === id}
        to={path + "?" + Routes.PARAM_AGENT_ID + "=" + id}
      >
        <AgentStatusBadge status={activity!}>{avatar}</AgentStatusBadge>
        <ListItemText
          className={classes.listItemText}
          primary={fullName}
          secondary={email}
        />
        <AgentRoleItem role={role} />
        <ListItemSecondaryAction>
          {!props.isCurrentUser && (
            <>
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
                onRoleSelected={handleOnRoleChanged}
                onDelete={handleOnDelete}
              />
            </>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

type AgentOptionsMenuProps = {
  popupState: PopupState;
  selectedAgent: UserViewModel;
  onRoleSelected: (role: Role) => void;
  onDelete: () => void;
};

const AgentOptionsMenu: FC<AgentOptionsMenuProps> = (props) => {
  const classes = useStyles();

  const handleOnChangeRoleClick = () => {
    setChangeRoleDialogOpen(true); //opens change role dialog
    props.popupState.close(); //closes menu
  };

  const handleOnDeleteClick = () => {
    props.popupState.close(); //closes menu
    props.onDelete(); //callback
  };

  const handleOnRoleSelected = (role: Role | null) => {
    setChangeRoleDialogOpen(false);
    //if a role has actually been selected from list (not dismissed by clicking away from the dialog for example).
    if (role) {
      props.onRoleSelected(role);
    }
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
        onRoleSelected={handleOnRoleSelected}
      />
    </>
  );
};

type ChangeRoleDialogProps = {
  open: boolean;
  selectedAgent: UserViewModel;
  onRoleSelected: (selectedRole: Role | null) => void;
};

const ChangeRoleDialog: FC<ChangeRoleDialogProps> = (props) => {
  const handleUserRoleItemClicked = (role: Role | null) => {
    props.onRoleSelected(role);
  };

  return (
    <Dialog
      onClose={() => handleUserRoleItemClicked(null)}
      aria-labelledby="change-role-dialog"
      open={props.open}
    >
      <DialogTitle id="change-role-dialog">
        Change Role for: {props.selectedAgent.fullName}
      </DialogTitle>
      <List>
        <ListItem
          selected={props.selectedAgent.role === Role.ADMIN}
          button
          onClick={() => handleUserRoleItemClicked(Role.ADMIN)}
          key={Role.ADMIN}
        >
          <ListItemIcon>
            <VerifiedUser />
          </ListItemIcon>
          <ListItemText primary={"Admin"} />
        </ListItem>
        <ListItem
          selected={props.selectedAgent.role === Role.AGENT}
          button
          onClick={() => handleUserRoleItemClicked(Role.AGENT)}
          key={Role.AGENT}
        >
          <ListItemIcon />
          <ListItemText primary={"Agent"} />
        </ListItem>
      </List>
    </Dialog>
  );
};
export default AgentListItem;
