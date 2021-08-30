import React, { FC } from "react";
import {
  ListItem,
  ListItemIcon,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { MoreHoriz } from "@material-ui/icons";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import qs from "qs";
import { Routes } from "../../route/routes";
import GroupViewModel from "../../viewmodel/group/GroupViewModel";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { PopupState } from "material-ui-popup-state/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      width: theme.spacing(8),
    },

    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },

    listItemText: {
      "& .MuiTypography-body1": {
        fontWeight: 500,
      },
    },

    listItemButton: {
      "&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    popUpListItemWarning: {
      color: theme.palette.error.dark,
    },
  })
);

export interface GroupListItemProps {
  group: GroupViewModel;
  onRequestDeleteGroup: (group: GroupViewModel) => void;
  onRequestAddMembersToGroup: (group: GroupViewModel) => void;
  onRequestRemoveMembersFromGroup: (group: GroupViewModel) => void;
}

export interface QueryParams {
  groupId: number;
}

const GroupListItem: FC<GroupListItemProps> = (props: GroupListItemProps) => {
  const {
    group,
    onRequestDeleteGroup,
    onRequestAddMembersToGroup,
    onRequestRemoveMembersFromGroup,
  } = props;
  const classes = useStyles();
  const { path } = useRouteMatch();
  const location = useLocation();

  const { [Routes.PARAM_GROUP_ID]: groupIdFromQueryParams } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    }
  );

  const popUpState = usePopupState({
    variant: "popper",
    popupId: "GROUP_LIST_ITEM_POPUP",
  });

  return (
    <>
      <ListItem
        button
        className={classes.listItemButton}
        component={Link}
        selected={groupIdFromQueryParams === group.id.toString()}
        to={path + "?" + Routes.PARAM_GROUP_ID + "=" + group.id}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <Avatar className={classes.avatar}>
            {group.name[0].toUpperCase()}
          </Avatar>
        </ListItemIcon>
        <ListItemText className={classes.listItemText} primary={group.name} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="options"
            {...bindTrigger(popUpState)}
          >
            <MoreHoriz />
          </IconButton>
          <GroupOptionsMenu
            onRequestAddMembersToGroup={() => onRequestAddMembersToGroup(group)}
            onRequestDeleteGroup={() => onRequestDeleteGroup(group)}
            onRequestRemoveMembersFromGroup={() =>
              onRequestRemoveMembersFromGroup(group)
            }
            popUpState={popUpState}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default GroupListItem;

type GroupsOptionsMenuProps = {
  popUpState: PopupState;
  onRequestDeleteGroup: () => void;
  onRequestAddMembersToGroup: () => void;
  onRequestRemoveMembersFromGroup: () => void;
};

const GroupOptionsMenu: FC<GroupsOptionsMenuProps> = (props) => {
  const {
    popUpState,
    onRequestDeleteGroup,
    onRequestAddMembersToGroup,
    onRequestRemoveMembersFromGroup,
  } = props;
  const classes = useStyles();

  return (
    <Menu {...bindMenu(popUpState)}>
      <MenuItem
        onClick={() => {
          popUpState.close();
          onRequestAddMembersToGroup();
        }}
      >
        Add members
      </MenuItem>
      <MenuItem
        onClick={() => {
          popUpState.close();
          onRequestRemoveMembersFromGroup();
        }}
      >
        Remove members
      </MenuItem>
      <MenuItem
        className={classes.popUpListItemWarning}
        onClick={() => {
          popUpState.close();
          onRequestDeleteGroup();
        }}
      >
        Delete group
      </MenuItem>
    </Menu>
  );
};
