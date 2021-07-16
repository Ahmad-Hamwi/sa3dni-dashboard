import {
  List,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";

import AgentListItem from "../../../../../components/agents/AgentListItem";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../../../../reducers/users/users_reducer";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getUsers } from "../../../../../actions/users_actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    agentsList: {
      padding: 0,
    },

    loadingContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  })
);

export default function AgentsList() {
  const classes = useStyles();

  const { isUsersLoading, users, UsersError } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (UsersError) {
      toast.error(UsersError.message);
    }
  }, [UsersError]);

  return (
    <>
      {isUsersLoading && (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}
      <List className={classes.agentsList}>
        {users &&
          users.map((agentItem) => (
            <AgentListItem
              key={agentItem.id}
              id={agentItem.id}
              name={agentItem.name}
              email={"SomeEmail@Gmail.com"}
              role={1}
              status={0}
            />
          ))}
      </List>
    </>
  );
}
