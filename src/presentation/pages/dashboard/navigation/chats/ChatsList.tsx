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
  FormControlLabel,
  List,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import ChatsListItem from "../../../../components/chats/ChatsListItem";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "../../../../reducers/chat/list/chats_reducer";
import { Spinner } from "../../../../components/app/loader/Spinner";
import {
  closeChat,
  getChats,
  transferChat,
} from "../../../../actions/chat_actions";
import ChatViewModel from "../../../../viewmodel/chat/ChatViewModel";
import GroupViewModel from "../../../../viewmodel/group/GroupViewModel";
import { groupsSelector } from "../../../../reducers/groups/groups_reducers";
import { getGroups } from "../../../../actions/groups_actions";
import { dispatch } from "react-hot-toast";
import { authSelector } from "../../../../reducers/app/auth/auth_reducer";

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

  radioButton: {
    "&$checked": {
      color: theme.palette.primary.dark,
    },
  },

  noChatsText: {
    height: `calc(100vh - ${theme.spacing(13)}px)`,
    lineHeight: `calc(100vh - ${theme.spacing(13)}px)`,
    textAlign: "center",
    fontWeight: 500,
  },
}));

const ChatsList = () => {
  const classes = useStyles();
  const [closeChatDialogOpen, setCloseChatDialogOpen] = useState(false);
  const [transferChatDialogOpen, setTransferChatDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const { groups } = useSelector(groupsSelector);

  useEffect(() => {
    if (!groups) {
      dispatch(getGroups());
    }
  }, [groups]);

  const { chats, chatsLoading, error } = useSelector(chatSelector);

  useEffect(() => {
    if (!chats) {
      dispatch(getChats());
    }
  }, [chats]);

  const [selectedChat, setSelectedChat] = useState<ChatViewModel>();

  const handleOnChatClosed = (chat: ChatViewModel) => {
    setSelectedChat(chat);
    setCloseChatDialogOpen(true);
  };

  const handleOnRequestTransferChat = (chat: ChatViewModel) => {
    setSelectedChat(chat);
    setTransferChatDialogOpen(true);
  };

  const { user } = useSelector(authSelector);

  const ChatsList = () => {
    return chats?.length === 0 ? (
      <Typography className={classes.noChatsText}>No chats opened</Typography>
    ) : (
      <List className={classes.agentsList}>
        {chats &&
          chats.map((chat) => {
            if (chat.status !== "CLOSED") {
              return (
                <ChatsListItem
                  currentUser={user!}
                  chat={chat}
                  onRequestCloseChat={handleOnChatClosed}
                  onRequestTransferChat={handleOnRequestTransferChat}
                />
              );
            }
          })}
      </List>
    );
  };

  const handleOnCloseChatConfirmation = () => {
    console.log(selectedChat);
    if (selectedChat) {
      dispatch(closeChat(selectedChat.id));
    }
    setCloseChatDialogOpen(false);
  };

  const handleOnChatTransferConfirmation = (group: GroupViewModel) => {
    if (selectedChat) {
      dispatch(transferChat({ chatId: selectedChat.id, groupId: group.id }));
    }
    setTransferChatDialogOpen(false);
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

      {selectedChat && (
        <TransferChatDialog
          open={transferChatDialogOpen}
          groups={groups!}
          currentGroup={selectedChat?.group!}
          onPositive={handleOnChatTransferConfirmation}
          onNegative={() => setTransferChatDialogOpen(false)}
        />
      )}

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

type TransferChatDialogProps = {
  open: boolean;
  currentGroup: GroupViewModel;
  groups: GroupViewModel[];
  onPositive: (group: GroupViewModel) => void;
  onNegative: () => void;
};

const TransferChatDialog: FC<TransferChatDialogProps> = (props) => {
  const classes = useStyles();

  const currentGroupIndex = props.groups.findIndex(
    (groupItem) => groupItem.id === props.currentGroup.id
  );

  const [selectedGroupIndex, setSelectedGroupIndex] =
    useState(currentGroupIndex);

  const radioGroupRef = React.useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const index = +value;
    setSelectedGroupIndex(index);
  };

  return (
    <Dialog
      maxWidth="xs"
      onEntering={handleEntering}
      open={props.open}
      onClose={() => props.onNegative()}
    >
      <DialogTitle>Select a group to transfer chat to:</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          onChange={handleChange}
          value={selectedGroupIndex}
        >
          {props.groups &&
            props.groups.map((groupItem, index) => (
              <FormControlLabel
                className={classes.radioButton}
                value={index}
                key={groupItem.id}
                disabled={groupItem.id === props.currentGroup?.id}
                control={<Radio classes={{ checked: classes.radioButton }} />}
                label={groupItem.name}
              />
            ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => props.onNegative()} color="primary">
          Cancel
        </Button>
        <Button
          disabled={currentGroupIndex === selectedGroupIndex}
          onClick={() => props.onPositive(props.groups[selectedGroupIndex])}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
