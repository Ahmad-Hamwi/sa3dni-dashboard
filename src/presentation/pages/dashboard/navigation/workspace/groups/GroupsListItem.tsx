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
import {Routes} from "../../../../../route/routes";

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
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  })
);

export interface GroupListItemProps {
  id: number;
  groupName: String;
}

export interface QueryParams {
  groupId: number;
}

const GroupListItem: FC<GroupListItemProps> = (props: GroupListItemProps) => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const location = useLocation();

  const { groupId: groupIdFromQueryParams } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <>
      <ListItem
        button
        className={classes.listItemButton}
        component={Link}
        selected={groupIdFromQueryParams === props.id.toString()}
        to={path + Routes.PARAM_GROUP_ID + "=" + props.id}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <Avatar className={classes.avatar}>{props.groupName[0]}</Avatar>
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={props.groupName}
        />

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
