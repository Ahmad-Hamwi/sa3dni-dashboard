import {
  Box,
  createStyles,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Attachment, Send } from "@material-ui/icons";
import { FC, KeyboardEventHandler, MouseEventHandler, useState } from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    inputPaper: {
      padding: theme.spacing(1),
      marginInline: theme.spacing(4),
    },

    inputPaperFocused: {
      border: `1px solid ${theme.palette.primary.main}`,
    },

    content: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
    },

    fileInput: {
      display: "none",
    },

    textInput: {
      paddingInline: theme.spacing(2),
      flexGrow: 1,
      alignSelf: "center",
    },
  })
);

interface MessageInputProps {
  onMessageSend: (messageToBeSent: string) => void;
}

const MessageInput: FC<MessageInputProps> = (props) => {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = (messageToBeSent: string) => {
    messageToBeSent.trim();
    if (message.length !== 0) {
      props.onMessageSend(messageToBeSent);
      setMessage("");
    }
  };

  const handleEnterPressed: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(message);
    }
  };

  const handleSendButtonPressed: MouseEventHandler<HTMLButtonElement> = (_) => {
    handleSendMessage(message);
  };

  return (
    <Paper
      variant="outlined"
      className={clsx(classes.inputPaper, focus && classes.inputPaperFocused)}
    >
      <Box className={classes.content}>
        <input
          accept="image/*"
          className={classes.fileInput}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <Attachment />
          </IconButton>
        </label>
        <InputBase
          className={clsx(classes.textInput)}
          multiline
          onKeyDown={handleEnterPressed}
          onChange={(event) => setMessage(event.target.value)}
          onFocus={(_) => setFocus(true)}
          onBlur={(_) => setFocus(false)}
          placeholder={"Write a message..."}
          value={message}
        />
        <IconButton color="primary" onClick={handleSendButtonPressed}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default MessageInput;
