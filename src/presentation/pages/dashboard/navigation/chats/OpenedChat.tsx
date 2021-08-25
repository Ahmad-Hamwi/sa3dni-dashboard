import { makeStyles } from "@material-ui/core/styles";
import { Box, createStyles, Paper, Typography } from "@material-ui/core";
import { Routes } from "../../../../route/routes";
import AppBar from "@material-ui/core/AppBar";
import EventMessage from "../../../../components/messages/EventMessage";
import TextMessage from "../../../../components/messages/TextMessage";
import MessageInput from "../../../../components/chats/MessageInput";
import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import {useDispatch, useSelector} from "react-redux";
import {chatSelector} from "../../../../reducers/chat/chat_reducer";
import {getChat} from "../../../../actions/chat_actions";

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

  const initial = [
    {
      id: "me",
      senderName: "Abdulrahman Tayara",
      message: "Hello, how may I help?",
      isSelf: true,
      isEvent: false,
    },
    {
      id: "cus",
      senderName: "Customer1",
      message: "Hi, I need help!",
      isSelf: false,
      isEvent: false,
    },
    {
      id: "me",
      senderName: "Abdulrahman Tayara",
      message: "Sure!",
      isSelf: true,
      isEvent: false,
    },
    {
      id: "me",
      senderName: "Abdulrahman Tayara",
      message: "Here is your help.",
      isSelf: true,
      isEvent: false,
    },
    // {
    //   id: "me",
    //   senderName: "Abdulrahman Tayara",
    //   message:
    //     "This is the most valuable message ever created, and it is actually long, and I'm testing this because its long, it is extremely long that I should be considering a max width for the text box itself, but now it has descended to another row, what a shame! I guess i  need to be making some tweeks in the css design.",
    //   isSelf: true,
    //   isEvent: false,
    // },
    {
      id: "cus",
      senderName: "Customer1",
      message: "Thank you very much!",
      isSelf: false,
      isEvent: true,
    },
    // {
    //   id: "me",
    //   senderName: "Customer1",
    //   message:
    //     "  This is the most valuable message ever created, and it is actually long, and I'm testing this because its long, it is extremely long that I should be considering a max width for the text box itself, but now it has descended to another row, what a shame! I guess i  need to be making some tweeks in the css design.",
    //   isSelf: false,
    //   isEvent: true,
    // },
  ];

  const [messages, setMessages] = useState(initial);
  const [scrollPosition, setScrollPosition] = useState();

  const location = useLocation();

  const { [Routes.PARAM_CHAT_ID]: selectedChatId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof selectedChatId === "string") {
      dispatch(getChat(selectedChatId));
    }
  }, [selectedChatId]);

  const handleOnMessageSend = (messageToBeSent: string) => {
    setMessages([
      ...messages,
      {
        id: "me",
        senderName: "Abdulrahman Tayara",
        message: messageToBeSent,
        isSelf: true,
        isEvent: false,
      },
    ]);
  };

  const MessageList = () => {
    return (
      <Box className={classes.messageList}>
        <EventMessage />
        {messages.map((message, index) => {
          let isConcatenated = false;
          if (index) {
            if (messages[index].id === messages[index - 1].id) {
              isConcatenated = true;
            }
          }
          return (
            <TextMessage
              key={message.message}
              textMessageProps={{ ...message, isConcatenated }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Box flexDirection={"column"} width={"60%"}>
      {selectedChatId && (
        <>
          <AppBar
            position="static"
            variant="outlined"
            color="transparent"
            className={classes.topBar}
          >
            <Typography className={classes.infoTopBarText}>Customer</Typography>
          </AppBar>

          <Box className={classes.content}>
            <MessageList />
            <MessageInput onMessageSend={handleOnMessageSend} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default OpenedChat;
