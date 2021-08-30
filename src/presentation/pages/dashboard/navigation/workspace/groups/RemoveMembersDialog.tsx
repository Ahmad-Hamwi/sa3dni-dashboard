import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import FlexItemAgent from "../../../../../components/agents/FlexItemAgent";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../../../../reducers/users/users_reducer";
import { getUsers } from "../../../../../actions/users_actions";
import { Add } from "@material-ui/icons";
import { toast } from "react-hot-toast";
import ListOfUsersPopUpMenu from "../../../../../components/agents/ListOfAgentsPopUpMenu";
import UserViewModel from "../../../../../viewmodel/user/UserViewModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      addAgentContainer: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5),
        backgroundColor: "rgb(232, 232, 232)",
        height: theme.spacing(8),
        width: 400,
        marginTop: theme.spacing(2),
      },

      flexWrapper: {
        borderRadius: theme.spacing(0.5),
        backgroundColor: "rgb(232, 232, 232)",
        overflowX: "auto",
        overflowY: "hidden",
      },

      dialogActions: {
        margin: theme.spacing(2),
      },

      addUserText: {
        marginLeft: theme.spacing(1),
        whiteSpace: "nowrap",
        color: theme.palette.text.hint,
      },
    })
);

export interface RemoveMembersDialogProps {
  open: boolean;
  onSubmission: (users: UserViewModel[] | null) => void;
  existedUsersIds: string[];
}

type SelectionState = {
  selectedUsers: UserViewModel[];
  remainingUsers: UserViewModel[];
};

const RemoveMembersDialog: FC<RemoveMembersDialogProps> = (props) => {
  const classes = useStyles();

  const [selection, setSelection] = useState<SelectionState>({
    selectedUsers: [],
    remainingUsers: [],
  });

  const usersPopUpState = usePopupState({
    variant: "popper",
    popupId: "USERS_POPUP",
  });

  const handleOnClose = () => {
    //nothing was submitted
    props.onSubmission(null);
  };

  const dispatch = useDispatch();

  const { users, usersError } = useSelector(usersSelector);

  useEffect(() => {
    if (!users) dispatch(getUsers());
  }, [users, dispatch]);

  useEffect(() => {
    if (usersError) toast(usersError.message);
  }, [usersError, dispatch]);

  const addUserToSelected = (user: UserViewModel) => {
    setSelection((prevState) => {
      return {
        remainingUsers: prevState.remainingUsers.filter(
            (itrUser: UserViewModel) => itrUser.id !== user.id
        ),
        selectedUsers: [...prevState.selectedUsers, user],
      };
    });
  };

  useEffect(() => {
    if (users) {
      let existedUsers: UserViewModel[] = [];

      props.existedUsersIds.forEach((existedUserId) => {
        const foundUser = users.find((userItr) => userItr.id === existedUserId);
        if (foundUser) {
          existedUsers = [...existedUsers, foundUser];
        }
      });

      setSelection((prev) => {
        return { ...prev, remainingUsers: existedUsers };
      });
    }
  }, [users]);

  useEffect(() => {
    if (usersError) toast(usersError.message);
  }, [usersError]);

  const handleFormSubmission = () => {
    props.onSubmission(selection.selectedUsers);
  };

  const handleOnUserSelectedFromMenu = (user: UserViewModel) => {
    addUserToSelected(user);
  };

  return (
      <Dialog
          open={props.open}
          onClose={handleOnClose}
          aria-labelledby={"remove-members-from-group-form-dialog"}
      >
        <DialogTitle>Remove members from group</DialogTitle>
        <DialogContent>
          <Box className={classes.addAgentContainer}>
            {selection.selectedUsers?.map((user) => {
              return <FlexItemAgent user={user} />;
            })}
            {selection.remainingUsers.length !== 0 && (
                <>
                  <Button
                      {...bindTrigger(usersPopUpState)}
                      className={classes.addUserText}
                  >
                    Add Agent
                  </Button>
                  <ListOfUsersPopUpMenu
                      popupState={usersPopUpState}
                      users={selection.remainingUsers}
                      onUserSelected={handleOnUserSelectedFromMenu}
                  />
                </>
            )}
          </Box>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant={"outlined"} onClick={handleOnClose} color="primary">
            Cancel
          </Button>
          <Button
              disabled={selection.selectedUsers.length === 0}
              variant={"contained"}
              onClick={handleFormSubmission}
              color="primary"
              startIcon={<Add />}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default RemoveMembersDialog;
