import { Typography, Box, Card, Theme, makeStyles } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
  },

  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  content: {
    display: "flex",
    flexDirection: "column",
  },

  detailItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },

  detailItemText: {
    fontWeight: 400,
  },
}));

export interface Group {
  name: String;
}

export interface GroupPerformanceProps {
  totalChatAccepted: number;
  chatSatisfaction: String;
}

const GroupPerformance: FC<GroupPerformanceProps> = (
  props: GroupPerformanceProps
) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">Performance</Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.detailItem}>
          <Typography className={classes.detailItemText}>
            Total chats accepted (Last 7 days)
          </Typography>
          <Typography className={classes.detailItemText}>
            {props.totalChatAccepted}
          </Typography>
        </div>
        <div className={classes.detailItem}>
          <Typography className={classes.detailItemText}>
            Chat satisfactions (Last 7 days)
          </Typography>
          <Typography className={classes.detailItemText}>
            {props.chatSatisfaction}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default GroupPerformance;
