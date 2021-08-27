import { Box, Divider, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { FC } from "react";
import { EventMessageData } from "../../viewmodel/chat/message/data/EventMessageViewModel";

const useStyles = makeStyles((theme) =>
  createStyles({
    eventText: {
      fontsize: 16,
      fontWeight: 300,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      alignSelf: "center",
    },

    divider: {
      flexGrow: 1,
    },
  })
);

export interface EventMessageProps {
  eventMessage: EventMessageData;
}

const EventMessage: FC<EventMessageProps> = ({ eventMessage }) => {
  const classes = useStyles();

  const Message: FC<{ date: string; event: string }> = ({ date, event }) => {
    return (
      <Box display={"flex"} flexDirection={"column"} mt={2}>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Divider orientation={"horizontal"} className={classes.divider} />
          <Typography className={classes.eventText}>{date}</Typography>
          <Divider orientation={"horizontal"} className={classes.divider} />
        </Box>
        <Typography className={classes.eventText}>{event}</Typography>
      </Box>
    );
  };

  if (eventMessage.action === "chat-started") {
    const date = new Date(eventMessage.payload.createdAt);
    const dateString = date.toDateString() + " - " + date.toLocaleTimeString();
    const event = "Chat Started";
    return <Message date={dateString} event={event} />;
  }

  if (eventMessage.action === "chat-closed") {
    const date = new Date(eventMessage.payload.createdAt);
    const dateString = date.toDateString() + " - " + date.toLocaleTimeString();
    const event =
      eventMessage.payload.closedBy.fullName + " has closed the chat";
    return <Message date={dateString} event={event} />;
  }

  return <></>;
};

export default EventMessage;
