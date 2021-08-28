import {
  List,
  createStyles,
  makeStyles,
  Theme,
  Snackbar,
  Fab,
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
  deleteUser,
  getUsers,
} from "../../../../../actions/users_actions";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import { Add } from "@material-ui/icons";
import { InviteAgentDialog, InviteAgentForm } from "./InviteAgentDialog";
import {
  fetchInvitations,
  inviteUser,
} from "../../../../../actions/invitations_actions";
import {
  clearInviteUserState,
  invitationsSelector,
} from "../../../../../reducers/invitations/invitations_reducer";
import { authSelector } from "../../../../../reducers/app/auth/auth_reducer";
import UserViewModel from "../../../../../viewmodel/user/UserViewModel";
import { Role } from "../../../../../../infrastructure/model/UserModel";

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
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    snackBarMessage: "",
  });
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const {
    isUsersLoading,
    users,
    usersError,
    changeRoleSuccess,
    changeRoleError,
    deleteUserSuccess,
    deleteUserError,
  } = useSelector(usersSelector);

  const { user } = useSelector(authSelector);

  const { inviteResults, invitationErrors } = useSelector(invitationsSelector);

  const dispatch = useDispatch();

  //...................User dispatch and side effects............................

  useEffect(() => {
    if (users) return;
    dispatch(getUsers());
  }, [users, dispatch]);

  useEffect(() => {
    if (usersError) {
      toast.error(usersError.message);
    }
  }, [usersError]);

  //..................Change Role State and side effects .....................

  useEffect(() => {
    if (changeRoleSuccess) {
      setSnackbarState({
        open: true,
        snackBarMessage:
          changeRoleSuccess.fullName + " role has been changed successfully.",
      });
    } else if (changeRoleError) {
      setSnackbarState({
        open: true,
        snackBarMessage: "Something went wrong. Role has not changed.",
      });
    }
    return () => {
      dispatch(clearChangeRoleReducer());
    };
  }, [dispatch, changeRoleSuccess, changeRoleError]);

  //..................Delete User and side effects .....................

  useEffect(() => {
    if (deleteUserSuccess) {
      setSnackbarState({
        open: true,
        snackBarMessage:
          deleteUserSuccess.fullName +
          " user has been removed from workspace successfully.",
      });
    }
    return () => {
      dispatch(clearChangeRoleReducer());
    };
  }, [dispatch, deleteUserSuccess]);

  useEffect(() => {
    if (deleteUserError) {
      setSnackbarState({
        open: true,
        snackBarMessage:
          "Something went wrong. User has not been removed from workspace.",
      });
      return () => {
        dispatch(clearChangeRoleReducer());
      };
    }
  }, [dispatch, deleteUserError]);

  //......................event handlers.....................................

  const handleOnRoleChanged = (id: string, role: Role) => {
    dispatch(changeSelectedUserRole({ userId: id, newRole: role }));
  };

  const handleOnDeleteUser = (userToBeDeleted: UserViewModel) => {
    dispatch(deleteUser(userToBeDeleted));
  };

  const handleOnInviteAgentFormSubmission = (
    inviteForm: InviteAgentForm | null
  ) => {
    setIsInviteDialogOpen(false);

    //if actually submitted, not dismissed.
    if (inviteForm) {
      if (inviteResults) {
        if (inviteResults[0].email !== inviteForm.email) {
          dispatch(inviteUser(inviteForm));
        }
      } else {
        dispatch(inviteUser(inviteForm));
      }
    }
  };

  useEffect(() => {
    if (inviteResults) {
      setSnackbarState({
        open: true,
        snackBarMessage: "Invitation sent successfully.",
      });

      dispatch(fetchInvitations());
    } else if (invitationErrors) {
      setSnackbarState({
        open: true,
        snackBarMessage: "Something went wrong, Error sending invitation.",
      });
    }

    return () => {
      dispatch(clearInviteUserState());
    };
  }, [inviteResults, invitationErrors]);

  const AgentsList = () => {
    return (
      <List className={classes.agentsList}>
        {users &&
          users.map((agentItem) => (
            <AgentListItem
              key={agentItem.id}
              agent={agentItem}
              onRoleChanged={handleOnRoleChanged}
              onDelete={handleOnDeleteUser}
              isCurrentUser={agentItem.id === user?.id}
            />
          ))}
      </List>
    );
  };

  const AgentsSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarState.open}
        autoHideDuration={3000}
        message={snackbarState.snackBarMessage}
      />
    );
  };

  const InviteAgentsFab = () => {
    return (
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
    );
  };

  return (
    <Spinner loading={isUsersLoading}>
      <AgentsList />
      <AgentsSnackbar />
      <InviteAgentsFab />
      <InviteAgentDialog
        open={isInviteDialogOpen}
        handleOnSubmission={handleOnInviteAgentFormSubmission}
      />
    </Spinner>
  );
}
