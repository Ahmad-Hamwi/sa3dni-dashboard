import {
  CircularProgress,
  Card,
  makeStyles,
  Theme,
  Avatar,
  Divider,
} from "@material-ui/core";
import { FC, useEffect } from "react";
import AgentBanner from "../../../../../components/agentdetails/AgentBanner";
import AgentGroups from "../../../../../components/agentdetails/AgentGroups";
import AgentPerformance from "../../../../../components/agentdetails/AgentPerformance";
import AgentAddtionalInfo from "../../../../../components/agentdetails/AgentAdditionalInfo";
import {
  getSelectedUser,
  getUsers,
} from "../../../../../actions/users_actions";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../../../../reducers/users/users_reducer";

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

export enum Status {
  ONLINE,
  BUSY,
  OFFLINE,
}

export enum Role {
  OWNER,
  ADMIN,
  NORMAL,
}

export interface AgentDetailsProps {
  selectedAgentId: string;
}

const AgentDetails: FC<AgentDetailsProps> = (props: AgentDetailsProps) => {
  const classes = useStyles();

  const { isSelectedUserLoading, selectedUser, selectedUserError } =
    useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedUser(props.selectedAgentId));
  }, [props, dispatch]);

  useEffect(() => {
    if (selectedUserError) {
      toast.error(selectedUserError.message);
    }
  }, [selectedUserError]);

  return (
    <>
      {isSelectedUserLoading && (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}
      {selectedUser && (
        <Card variant="outlined" className={classes.card}>
          <div className={classes.cardContent}>
            <AgentBanner
              status={Status.BUSY}
              username={selectedUser?.name!}
              jobTitle={selectedUser?.jobTitle!}
              email={selectedUser?.email!}
              role={Role.NORMAL}
            />
            <Divider />
            <AgentGroups groups={[]} />
            <Divider />
            <AgentPerformance
              totalChatAccepted={64}
              chatSatisfaction={"3/10"}
            />
            <Divider />
            <AgentAddtionalInfo chatLimit={4} />
          </div>
        </Card>
      )}
    </>
  );
};

export default AgentDetails;
