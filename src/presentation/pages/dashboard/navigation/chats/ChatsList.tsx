import AppBar from "@material-ui/core/AppBar";
import React, { FC, useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  Snackbar,
  Typography,
} from "@material-ui/core";
import ChatsListItem from "../../../../components/chats/ChatsListItem";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "../../../../reducers/chat/list/chats_reducer";
import { Spinner } from "../../../../components/app/loader/Spinner";
import { getChats } from "../../../../actions/chat_actions";
import ChatViewModel from "../../../../viewmodel/chat/ChatViewModel";

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
  const [closeChatDialogOpen, setCloseChatDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const { chats, chatsLoading, error } = useSelector(chatSelector);

  useEffect(() => {
    if (!chats) {
      dispatch(getChats());
    }
  }, [chats]);

  let selectedChatToBeClosed: ChatViewModel;
  const handleOnChatClosed = (chat: ChatViewModel) => {
    selectedChatToBeClosed = chat;
    setCloseChatDialogOpen(true);
  };

  const ChatsList = () => {
    return (
      <List className={classes.agentsList}>
        {chats &&
          chats.map((chat) => {
            return (
              <ChatsListItem
                chat={chat}
                onRequestCloseChat={handleOnChatClosed}
              />
            );
          })}
      </List>
    );
  };

  const handleOnCloseChatConfirmation = () => {
    if (selectedChatToBeClosed) {
      //dispatch action here;
    }
    setCloseChatDialogOpen(false);
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

      <CloseChatConfirmationDialog
        open={closeChatDialogOpen}
        onPositive={handleOnCloseChatConfirmation}
        onNegative={() => {
          setCloseChatDialogOpen(false);
        }}
      />

      {error && <Snackbar autoHideDuration={3000} message={error?.message} />}
    </div>
  );
};

export default ChatsList;

type CloseChatConfirmationDialogProps = {
  open: boolean;
  onPositive: () => void;
  onNegative: () => void;
};

const CloseChatConfirmationDialog: FC<CloseChatConfirmationDialogProps> = (
  props
) => {
  return (
    <Dialog open={props.open} onClose={() => props.onNegative()}>
      <DialogTitle>Close Chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Closing the chat will end the current activity of a chat. You will no
          longer be able to communicate with the customer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onNegative()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.onPositive()} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
