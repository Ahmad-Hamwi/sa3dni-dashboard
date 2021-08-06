import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { IUser } from "../../../../../../domain/entity/User";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FlexItemGroup from "../../../../../components/groups/FlexItemGroup";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import ListOfGroupsPopUpMenu from "../../../../../components/groups/ListOfGroupsPopUpMenu";
import FlexItemAgent from "../../../../../components/agents/FlexItemAgent";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../../../../reducers/users/users_reducer";
import { getUsers } from "../../../../../actions/users_actions";
import { IGroup } from "../../../../../../domain/entity/Group";
import { Add, Send } from "@material-ui/icons";
import { toast } from "react-hot-toast";
import ListOfUsersPopUpMenu from "../../../../../components/agents/ListOfAgentsPopUpMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    groupNameInput: {
      width: "100%",

      "&.MuiFilledInput-underline:before": {
        borderBottom: 0,
      },
      "&.MuiFilledInput-underline:hover": {
        borderBottom: 0,
      },
    },

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

export interface CreateGroupForm {
  name: string;
  users: IUser[];
}

export interface CreateGroupDialogProps {
  open: boolean;
  onSubmission: (form: CreateGroupForm | null) => void;
}

type SelectionState = {
  selectedUsers: IUser[];
  remainingUsers: IUser[];
};

const CreateGroupDialog: FC<CreateGroupDialogProps> = (props) => {
  const classes = useStyles();

  const [groupName, setGroupName] = useState("");
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

  const addUserToSelected = (user: IUser) => {
    setSelection((prevState) => {
      return {
        remainingUsers: prevState.remainingUsers.filter(
          (itrUser: IUser) => itrUser.id !== user.id
        ),
        selectedUsers: [...prevState.selectedUsers, user],
      };
    });
  };

  useEffect(() => {
    if (users) {
      setSelection((prev) => {
        return { ...prev, remainingUsers: users };
      });
    }
  }, [users]);

  useEffect(() => {
    if (usersError) toast(usersError.message);
  }, [usersError]);

  const handleFormSubmission = () => {
    props.onSubmission({
      name: groupName,
      users: selection.selectedUsers,
    });
  };

  const handleOnUserSelectedFromMenu = (user: IUser) => {
    addUserToSelected(user);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleOnClose}
      aria-labelledby={"create-group-form-dialog"}
    >
      <DialogTitle>Create Group</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.groupNameInput}
          label="Group Name"
          variant="filled"
          onChange={(event) => setGroupName(event.target.value)}
          size={"small"}
        >
          {groupName}
        </TextField>
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

export default CreateGroupDialog;
