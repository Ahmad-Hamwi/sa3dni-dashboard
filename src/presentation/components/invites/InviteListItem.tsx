import React, { FunctionComponent } from "react";
import { Avatar, ListItem, ListItemText } from "@material-ui/core";
import { AgentRoleItem } from "../agents/AgentRoleItem";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import InvitationViewModel from "../../viewmodel/invitation/InvitationViewModel";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    listItem: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
    title: {
      fontWeight: 500,
      marginLeft: theme.spacing(2),
    },
  });
});

export type InviteListItemProps = {
  invitation: InvitationViewModel;
};

const InviteListItem: FunctionComponent<InviteListItemProps> = (props) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <Avatar className={classes.avatar}>{props.invitation.email[0].toUpperCase()}</Avatar>
      <ListItemText
        className={classes.title}
        primary={props.invitation.email}
      />
      <AgentRoleItem role={props.invitation.role} />
    </ListItem>
  );
};

export default InviteListItem;
