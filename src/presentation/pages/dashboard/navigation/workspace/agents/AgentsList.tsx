import {
  List,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";

import AgentListItem from "../../../../../components/agents/AgentListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearChangeRoleReducer,
  usersSelector,
} from "../../../../../reducers/users/users_reducer";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUsers } from "../../../../../actions/users_actions";
import { Alert } from "@material-ui/lab";

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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  let snackBarMessage = "";

  const {
    isUsersLoading,
    users,
    UsersError,
    changeRoleSuccess,
    changeRoleError,
  } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (UsersError) {
      toast.error(UsersError.message);
    }
  }, [UsersError]);

  useEffect(() => {
    if (changeRoleSuccess) {
      snackBarMessage =
        changeRoleSuccess.name + "role has been changed successfully";
    } else if (changeRoleError) {
      snackBarMessage =
        "Something went wrong. " + changeRoleError.name + "has not changed.";
    }

    return () => {
      dispatch(clearChangeRoleReducer());
    };
  }, [changeRoleSuccess, changeRoleError]);

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
            <AgentListItem key={agentItem.id} agent={agentItem} />
          ))}
      </List>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
      >
        <Alert
          severity={
            changeRoleSuccess
              ? "success"
              : changeRoleError
              ? "error"
              : undefined
          }
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
