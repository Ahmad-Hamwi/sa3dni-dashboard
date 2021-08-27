import { makeStyles } from "@material-ui/core/styles";
import { Box, createStyles, Paper, Typography } from "@material-ui/core";
import { Routes } from "../../../../route/routes";
import AppBar from "@material-ui/core/AppBar";
import EventMessage from "../../../../components/messages/EventMessage";
import MessageInput from "../../../../components/chats/MessageInput";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { getChat, getChatMessages } from "../../../../actions/chat_actions";
import TextMessage, {
  TextMessageProps,
} from "../../../../components/messages/TextMessage";
import { openedChatSelector } from "../../../../reducers/chat/opened/opened_chat_reducer";
import { Spinner } from "../../../../components/app/loader/Spinner";
import { messagesSelector } from "../../../../reducers/chat/messages/messages_reducer";
import { chatSelector } from "../../../../reducers/chat/list/chats_reducer";
import ChatViewModel from "../../../../viewmodel/chat/ChatViewModel";
import { current } from "@reduxjs/toolkit";
import ChatMessageViewModel, {
  MessageContent,
  TextMessageType,
} from "../../../../viewmodel/chat/message/ChatMessageViewModel";
import {
  EVENT_MESSAGE,
  TEXT_MESSAGE,
} from "../../../../viewmodel/chat/message/data/constants";
import TextMessageViewModel from "../../../../viewmodel/chat/message/data/TextMessageViewModel";
import { authSelector } from "../../../../reducers/app/auth/auth_reducer";
import {
  joinChat,
  sendTextMessage,
} from "../../../../actions/dashboardsocket/dashboard_socket_actions";

const useStyles = makeStyles((theme) =>
  createStyles({
    topBar: {
      justifyContent: "center",
      alignItems: "center",
      height: theme.spacing(6) + 2,
      "&.MuiPaper-outlined": {
        border: "0px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      },
    },

    infoTopBarText: {
      fontWeight: 500,
    },

    content: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingBottom: theme.spacing(4),
      overflowY: "auto",
      maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    },

    messageList: {
      display: "Flex",
      flexDirection: "column",
      overflow: "auto",
      paddingBottom: theme.spacing(2.5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      gap: theme.spacing(0.5),
    },
  })
);

const OpenedChat = () => {
  const classes = useStyles();

  const [scrollPosition, setScrollPosition] = useState();

  const location = useLocation();

  const { [Routes.PARAM_CHAT_ID]: selectedChatId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { user: self } = useSelector(authSelector);

  const dispatch = useDispatch();

  const { chats } = useSelector(chatSelector);

  useEffect(() => {
    if (typeof selectedChatId === "string") {
      const foundChat = chats?.find(
        (chatItem) => chatItem.id === selectedChatId
      );
      if (foundChat) {
        if (!foundChat.messages) {
          dispatch(getChatMessages(selectedChatId));
        }
      } else {
        dispatch(getChat(selectedChatId));
      }
    }
  }, [chats, selectedChatId]);

  const { loading, error } = useSelector(messagesSelector);

  const currentChat: ChatViewModel | undefined = chats?.find(
    (chatItem) => chatItem.id === selectedChatId
  );

  useEffect(() => {
    dispatch(joinChat(currentChat?.roomId!));
  }, [currentChat]);

  const messages: ChatMessageViewModel[] | undefined = currentChat?.messages;

  const handleOnMessageSend = (messageToBeSent: string) => {
    dispatch(sendTextMessage(currentChat?.roomId!, messageToBeSent));
  };

  const MessageList = () => {
    return (
      <Box className={classes.messageList}>
        <EventMessage />
        {messages &&
          messages.map((message, index) => {
            if (message.content.type === "TEXT") {
              const senderName = message.sender?.fullName!;
              const isSelf = message.sender?.id === self?.id;
              const text = message.content.data;

              let isConcatenated = false;
              if (index) {
                if (
                  messages[index].sender!.id === messages[index - 1].sender!.id
                ) {
                  isConcatenated = true;
                }
              }

              return (
                <TextMessage
                  key={message.id}
                  textMessageProps={{
                    senderName,
                    isSelf,
                    message: text,
                    isConcatenated,
                  }}
                />
              );
            }
          })}
      </Box>
    );
  };

  return (
    <Box flexDirection={"column"} width={"60%"} position={"relative"}>
      <Spinner loading={loading}>
        {selectedChatId && messages && (
          <>
            <AppBar
              position="static"
              variant="outlined"
              color="transparent"
              className={classes.topBar}
            >
              <Typography className={classes.infoTopBarText}>
                Customer
              </Typography>
            </AppBar>

            <Box className={classes.content}>
              <MessageList />
              <MessageInput onMessageSend={handleOnMessageSend} />
            </Box>
          </>
        )}
      </Spinner>
    </Box>
  );
};

export default OpenedChat;

type something = "something";

const bla: something = "something";
