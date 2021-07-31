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
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    snackBarMessage: "",
  });
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const {
    isUsersLoading,
    users,
    UsersError,
    changeRoleSuccess,
    changeRoleError,
  } = useSelector(usersSelector);
  const dispatch = useDispatch();

  //...................User dispatch and side effects............................

  useEffect(() => {
    if (users) return;
    dispatch(getUsers());
  }, [users, dispatch]);

  useEffect(() => {
    if (UsersError) {
      toast.error(UsersError.message);
    }
  }, [UsersError]);

  //..................Change Role State and side effects .....................

  useEffect(() => {
    if (changeRoleSuccess) {
      setSnackbarState({
        open: true,
        snackBarMessage:
            changeRoleSuccess.name + "role has been changed successfully",
      });
    } else if (changeRoleError) {
      setSnackbarState({
        open: true,
        snackBarMessage:
            "Something went wrong. Role has not changed.",
      });
    }
    return () => {
      dispatch(clearChangeRoleReducer());
    };
  }, [dispatch, changeRoleSuccess, changeRoleError]);

  //......................event handlers.....................................

  const handleOnRoleChanged = (id: string, role: UserRole) => {
    dispatch(changeSelectedUserRole({ userId: id, newRole: role }));
  };

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
      >
        <Alert
          severity={
            changeRoleSuccess
              ? "success"
              : "error"
          }
        >
          {snackbarState.snackBarMessage}
        </Alert>
      </Snackbar>
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
