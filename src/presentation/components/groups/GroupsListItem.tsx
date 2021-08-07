import { FC } from "react";
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
} from "@material-ui/core";

import { MoreHoriz } from "@material-ui/icons";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import qs from "qs";
import { Routes } from "../../route/routes";
import { IGroup } from "../../../domain/entity/Group";

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
  })
);

export interface GroupListItemProps {
  group: IGroup;
}

export interface QueryParams {
  groupId: number;
}

const GroupListItem: FC<GroupListItemProps> = ({
  group,
}: GroupListItemProps) => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const location = useLocation();

  const { [Routes.PARAM_GROUP_ID]: groupIdFromQueryParams } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    }
  );

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
          <IconButton edge="end" aria-label="options">
            <MoreHoriz />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default GroupListItem;
