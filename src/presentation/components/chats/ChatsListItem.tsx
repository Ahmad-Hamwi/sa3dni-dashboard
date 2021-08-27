import {
  Avatar,
  createStyles,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import React, { FC } from "react";
import { Routes } from "../../route/routes";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import qs from "qs";
import ChatViewModel from "../../viewmodel/chat/ChatViewModel";
import {bindMenu, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import { PopupState } from "material-ui-popup-state/es/core";

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

    listItemButton: {
      height: theme.spacing(8),
      "&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    popUpListItemWarning: {
      color: theme.palette.error.dark,
    },
  })
);

export interface ChatsListItemProps {
  chat: ChatViewModel;
  onRequestCloseChat: (chat: ChatViewModel) => void;
}

const ChatsListItem: FC<ChatsListItemProps> = (props) => {
  const { chat, onRequestCloseChat } = props;
  const { customer, user, group } = chat;

  const classes = useStyles();

  const { path } = useRouteMatch();
  const location = useLocation();

  const { [Routes.PARAM_CHAT_ID]: chatIdFromQueryParams } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    }
  );

  const CustomerAvatar = () => {
    return (
      <Avatar className={classes.avatar}>
        {customer.fullName[0].toUpperCase()}
      </Avatar>
    );
  };

  const popUpState = usePopupState({
    variant: "popper",
    popupId: "CHAT_LIST_ITEM_POPUP",
  });

  return (
    <>
      <ListItem
        button
        className={classes.listItemButton}
        component={Link}
        selected={chatIdFromQueryParams === chat.id}
        to={path + "?" + Routes.PARAM_CHAT_ID + "=" + chat.id}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <CustomerAvatar />
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={chat.customer.fullName}
          // secondary={last message}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="options"
            {...bindTrigger(popUpState)}
          >
            <MoreHoriz />
          </IconButton>
          <Menu {...bindMenu(popUpState)}>
            <MenuItem onClick={() => onRequestCloseChat(chat)}>
              Close chat
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default ChatsListItem;
