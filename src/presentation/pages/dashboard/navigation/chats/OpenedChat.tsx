import { makeStyles } from "@material-ui/core/styles";
import { Box, createStyles, Paper, Typography } from "@material-ui/core";
import { Routes } from "../../../../route/routes";
import AppBar from "@material-ui/core/AppBar";
import EventMessage from "../../../../components/messages/EventMessage";
import TextMessage from "../../../../components/messages/TextMessage";
import { Event } from "@material-ui/icons";
import MessageInput from "../../../../components/chats/MessageInput";

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
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      overflowY: "auto",
      maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    },

    messageList: {
      display: "Flex",
      flexDirection: "column",
      overflow: "auto",
      paddingBottom: theme.spacing(2.5),
      gap: theme.spacing(0.5),
    },
  })
);

const OpenedChat = () => {
  const classes = useStyles();

  const messages = [
    {
      senderName: "Abdulrahman Tayara",
      message: "Hello, how may I help?",
      isSelf: true,
      isConcatenated: false,
      isEvent: false,
    },
    {
      senderName: "Customer1",
      message: "Hi, I need help!",
      isSelf: false,
      isConcatenated: false,
      isEvent: false,
    },
    {
      senderName: "Abdulrahman Tayara",
      message: "Sure!",
      isSelf: true,
      isConcatenated: false,
      isEvent: false,
    },
    {
      senderName: "Abdulrahman Tayara",
      message: "Here is your help.",
      isSelf: true,
      isConcatenated: true,
      isEvent: false,
    },
    // {
    //   senderName: "Abdulrahman Tayara",
    //   message:
    //     "This is the most valuable message ever created, and it is actually long, and I'm testing this because its long, it is extremely long that I should be considering a max width for the text box itself, but now it has descended to another row, what a shame! I guess i  need to be making some tweeks in the css design.",
    //   isSelf: true,
    //   isConcatenated: true,
    //   isEvent: false,
    // },
    {
      senderName: "Customer1",
      message: "Thank you very much!",
      isSelf: false,
      isConcatenated: false,
      isEvent: true,
    },
    // {
    //   senderName: "Customer1",
    //   message:
    //     "  This is the most valuable message ever created, and it is actually long, and I'm testing this because its long, it is extremely long that I should be considering a max width for the text box itself, but now it has descended to another row, what a shame! I guess i  need to be making some tweeks in the css design.",
    //   isSelf: false,
    //   isConcatenated: true,
    //   isEvent: true,
    // },
  ];

  const MessageList = () => {
    return (
      <Box className={classes.messageList}>
        <EventMessage />
        {messages.map((message, index) => (
          <TextMessage textMessageProps={message} />
        ))}
      </Box>
    );
  };

  return (
    <Box flexDirection={"column"} width={"60%"}>
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
        <MessageInput onMessageSend={(messageToBeSent) => {}} />
      </Box>
    </Box>
  );
};

export default OpenedChat;
