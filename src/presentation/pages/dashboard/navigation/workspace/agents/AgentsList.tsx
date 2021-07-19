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
import { Spinner } from "../../../../../components/app/loader/Spinner";

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

  const handleOnDelete = (id: string) => {
    // TODO: Call remove action
  };

  return (
    <Spinner loading={isUsersLoading}>
      <List className={classes.agentsList}>
        {users &&
          users.map((agentItem) => (
            <AgentListItem
              key={agentItem.id}
              agent={agentItem}
              onDelete={handleOnDelete}
            />
          ))}
      </List>
    </Spinner>
  );
}
