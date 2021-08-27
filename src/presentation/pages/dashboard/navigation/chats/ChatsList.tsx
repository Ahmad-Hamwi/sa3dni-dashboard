import AppBar from "@material-ui/core/AppBar";
import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { List, Snackbar, Typography } from "@material-ui/core";
import ChatsListItem from "../../../../components/chats/ChatsListItem";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "../../../../reducers/chat/list/chats_reducer";
import { Spinner } from "../../../../components/app/loader/Spinner";
import { getChats } from "../../../../actions/chat_actions";

const useStyles = makeStyles((theme: Theme) => ({
  listSection: {
    width: "40%",
    position: "relative",
  },

  listSectionContent: {
    maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    overflow: "auto",
  },

  agentsList: {
    padding: 0,
  },

  appBar: {
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(6) + 2,
    "&.MuiPaper-outlined": {
      border: "0px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },

  appBarText: {
    fontWeight: 500,
  },
}));

const ChatsList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { chats, chatsLoading, error } = useSelector(chatSelector);

  useEffect(() => {
    if (!chats) {
      dispatch(getChats());
    }
  }, [chats]);

  const handleOnChatClosed = () => {};
  const handleOnChatArchived = () => {};

  const ChatsList = () => {
    return (
      <List className={classes.agentsList}>
        {chats &&
          chats.map((chat) => {
            return (
              <ChatsListItem
                chat={chat}
                onChatClosed={handleOnChatClosed}
                onChatArchived={handleOnChatArchived}
              />
            );
          })}
      </List>
    );
  };

  return (
    <div className={classes.listSection}>
      <AppBar
        position="static"
        variant="outlined"
        className={classes.appBar}
        color={"transparent"}
      >
        <Typography className={classes.appBarText}>Chats</Typography>
      </AppBar>

      <Spinner loading={chatsLoading}>
        <div className={classes.listSectionContent}>
          <ChatsList />
        </div>
      </Spinner>

      {error && <Snackbar autoHideDuration={3000} message={error?.message} />}
    </div>
  );
};

export default ChatsList;
