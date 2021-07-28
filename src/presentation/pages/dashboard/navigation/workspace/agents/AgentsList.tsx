import {
  List,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
  Snackbar,
  Fab,
  Icon,
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
import { Add } from "@material-ui/icons";
import {
  InviteAgentDialog,
  InviteAgentForm,
} from "../../../../../components/agents/InviteAgentDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    agentsList: {
      padding: 0,
    },

    margin: {
      width: theme.spacing(19),
      position: "absolute",
      top: "100%",
      left: "100%",
      transform: "translate(-120%, -150%)",
    },

    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default function AgentsList() {
  const classes = useStyles();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  let snackBarMessage = "";
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const {
    isUsersLoading,
    users,
    UsersError,
    changeRoleSuccess,
    changeRoleError,
  } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users) return;
    dispatch(getUsers());
  }, [users, dispatch]);

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

    setIsInviteDialogOpen(true);

    return () => {
      dispatch(clearChangeRoleReducer());
    };
  }, [changeRoleSuccess, changeRoleError]);

  const handleOnDeleteUser = (id: string) => {};

  const handleOnInviteAgentFormSubmission = (
    inviteForm: InviteAgentForm | null
  ) => {
    setIsInviteDialogOpen(false);

    //if actually submitted, not dismissed.
    if (inviteForm) {
      // dispatch action.
    }
  };

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
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={() => setIsInviteDialogOpen(true)}
      >
        <Add className={classes.extendedIcon} />
        Invite Agents
      </Fab>
      <InviteAgentDialog
        open={isInviteDialogOpen}
        handleOnSubmission={handleOnInviteAgentFormSubmission}
      />
    </Spinner>
  );
}
