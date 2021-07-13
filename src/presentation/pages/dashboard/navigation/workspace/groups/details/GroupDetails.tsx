import {
  CircularProgress,
  Card,
  makeStyles,
  Theme,
  Avatar,
  Divider,
} from "@material-ui/core";
import { FC } from "react";
import GroupBanner from "./GroupBanner";
import GroupMembers from "./GroupMembers";
import GroupPerformance from "./GroupPerfomance";

const useStyles = makeStyles((theme: Theme) => ({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  card: {
    width: "90%",
    height: "auto",
    margin: `${theme.spacing(8)}px auto`,
    background: theme.palette.secondary.main,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    fontSize: 48,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  banner: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(6),
  },
  nameArea: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
  roleText: {
    fontWeight: 500,
    padding: theme.spacing(1),
  },
  role: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
}));

export interface GroupDetailsProps {
  groupName: String;
}

const GroupDetails: FC<GroupDetailsProps> = (props: GroupDetailsProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
      <Card variant="outlined" className={classes.card}>
        <div className={classes.cardContent}>
          <GroupBanner groupName={"General"} />
          <Divider />
          <GroupMembers users={[]} />
          <Divider />
          <GroupPerformance totalChatAccepted={64} chatSatisfaction={"3/10"} />
        </div>
      </Card>
    </>
  );
};

export default GroupDetails;
