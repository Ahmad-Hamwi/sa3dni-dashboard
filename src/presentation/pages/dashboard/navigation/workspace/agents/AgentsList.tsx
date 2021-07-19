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
import {
  changeSelectedUserRole,
  getUsers,
} from "../../../../../actions/users_actions";
import { Alert } from "@material-ui/lab";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import { UserRole } from "../../../../../../domain/entity/UserRole";

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

  const handleOnRoleChanged = (id: string, role: UserRole) => {
    dispatch(changeSelectedUserRole({ userId: id, newRole: role }));
  };

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

  const handleOnDeleteUser = (id: string) => {};

  return (
    <Spinner loading={isUsersLoading}>
      <List className={classes.agentsList}>
        {users &&
          users.map((agentItem) => (
            <AgentListItem
              key={agentItem.id}
              agent={agentItem}
              onRoleChanged={handleOnRoleChanged}
              onDelete={handleOnDeleteUser}
            />
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
    </Spinner>
  );
}
