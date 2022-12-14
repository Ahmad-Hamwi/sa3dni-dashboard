import {
  Avatar,
  Box,
  createStyles,
  Grow,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import TextMessageViewModel from "../../viewmodel/chat/message/data/TextMessageViewModel";
import ChatMessageViewModel from "../../viewmodel/chat/message/ChatMessageViewModel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },

    rootConcatenated: {
      marginTop: theme.spacing(1),
    },

    avatarTextContainer: {
      display: "flex",
      flexDirection: "row",
    },

    avatarTextContainerSelf: {
      flexDirection: "row-reverse",
    },

    listItemIcon: {
      width: theme.spacing(8),
    },

    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },

    avatarConcatenated: {
      visibility: "hidden",
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

    customerName: {
      marginInline: theme.spacing(8),
      fontsize: 16,
    },

    customerNameSelf: {
      alignSelf: "flex-end",
    },

    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: "80%",
      marginInline: theme.spacing(2),
      minHeight: theme.spacing(6),
      padding: theme.spacing(1),
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
    },

    textContainerSelf: {
      backgroundColor: theme.palette.secondary.main,
    },

    messageText: {
      fontsize: 16,
      lineHeight: `${theme.spacing(3)}px`,
    },

    messageTextSelf: {
      textAlign: "start",
    },

    agentRoot: {
      alignSelf: "flex-end",
    },
  })
);

export interface TextMessageProps {
  senderName: string;
  message: string;
  isSelf: boolean;
  isConcatenated: boolean;
}

export type TextMessagePropsType = {
  textMessageProps: TextMessageProps;
};

const TextMessage: FC<TextMessagePropsType> = ({ textMessageProps }) => {
  const [open, setOpen] = useState(false);
  const { senderName, message, isSelf, isConcatenated } = textMessageProps;
  const classes = useStyles();

  const renderedMessage = (
    <Box
      className={clsx(
        classes.root,
        !isConcatenated && classes.rootConcatenated,
        isSelf && classes.agentRoot
      )}
    >
      {!isConcatenated && (
        <Typography
          className={clsx(
            classes.customerName,
            isSelf && classes.customerNameSelf
          )}
        >
            {senderName}
        </Typography>
      )}
      <Box
        className={clsx(
          classes.avatarTextContainer,
          isSelf && classes.avatarTextContainerSelf
        )}
      >
        <Avatar
          className={clsx(
            classes.avatar,
            isConcatenated && classes.avatarConcatenated
          )}
        >
          {senderName[0].toUpperCase()}
        </Avatar>
        <Box
          className={clsx(
            classes.textContainer,
            isSelf && classes.textContainerSelf
          )}
        >
          <Typography
            className={clsx(
              classes.messageText,
              isSelf && classes.messageTextSelf
            )}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return open ? (
    <Grow onEntered={() => setOpen(true)}>
      {renderedMessage}
    </Grow>
  ) : (
    renderedMessage
  );
};

export default TextMessage;
