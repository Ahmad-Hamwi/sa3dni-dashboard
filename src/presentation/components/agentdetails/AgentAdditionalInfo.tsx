import { Typography, Theme, makeStyles } from "@material-ui/core";
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

export interface AgentAdditionalInfoProps {
  chatLimit: number;
}

const AgentAdditionalInfo: FC<AgentAdditionalInfoProps> = (
  props: AgentAdditionalInfoProps
) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">Additional Info</Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.detailItem}>
          <Typography className={classes.detailItemText}>Chat limit</Typography>
          <Typography className={classes.detailItemText}>
            {props.chatLimit}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AgentAdditionalInfo;
