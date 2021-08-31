import {
  List,
  createStyles,
  makeStyles,
  Theme,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import GroupListItem from "../../../../../components/groups/GroupsListItem";
import { useDispatch, useSelector } from "react-redux";
import { groupsSelector } from "../../../../../reducers/groups/groups_reducers";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import React, { FC, useEffect, useState } from "react";
import {
  createGroup,
  deleteGroup,
  getGroups,
} from "../../../../../actions/groups_actions";
import { toast } from "react-hot-toast";
import { Add, Close } from "@material-ui/icons";
import CreateGroupDialog, { CreateGroupForm } from "./CreateGroupDialog";
import GroupViewModel from "../../../../../viewmodel/group/GroupViewModel";
import { deleteGroupSuccessState } from "../../../../../reducers/groups/groups_states";
import AddMembersDialog from "./AddMembersDialog";
import UserViewModel from "../../../../../viewmodel/user/UserViewModel";
import RemoveMembersDialog from "./RemoveMembersDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    groupsList: {
      padding: 0,
    },

    loadingContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
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

    snackBar: {
      marginInline: theme.spacing(8),
    },
  })
);

export default function GroupsList() {
  const classes = useStyles();

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const dispatch = useDispatch();
  const {
    isGroupsLoading,
    groupsError,
    groups,
    deleteGroupError,
    createGroupError,
    createGroupSuccess,
    deleteGroupSuccess,
  } = useSelector(groupsSelector);

  useEffect(() => {
    if (groups) return;
    dispatch(getGroups());
  }, [groups, dispatch]);

  useEffect(() => {
    if (groupsError) {
      setSnackBarMessage(groupsError.message);
      setSnackBarOpen(true);
    }
  }, [groupsError]);

  useEffect(() => {
    if (deleteGroupSuccess) {
      setSnackBarMessage("Group deleted successfully!");
      setSnackBarOpen(true);
    }
  }, [deleteGroupSuccess]);

  useEffect(() => {
    if (deleteGroupError) {
      setSnackBarMessage(deleteGroupError.message);
      setSnackBarOpen(true);
    }
  }, [deleteGroupError]);

  useEffect(() => {
    if (createGroupError) {
      setSnackBarMessage(createGroupError.message);
      setSnackBarOpen(true);
    }
  }, [createGroupError]);

  useEffect(() => {
    if (createGroupSuccess) {
      setSnackBarMessage("Group created successfully!");
      setSnackBarOpen(true);
    }
  }, [createGroupSuccess]);

  const handleOnCreateGroupFormSubmission = (
    createForm: CreateGroupForm | null
  ) => {
    setIsCreateGroupDialogOpen(false);

    //if actually submitted, not dismissed.
    if (createForm) {
      dispatch(
        createGroup({
          name: createForm.name,
          members: createForm.users.map((user) => user.id),
        })
      );
    }
  };

  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [addMembersDialogOpen, setAddMembersDialogOpen] = useState(false);
  const [removeMembersDialogOpen, setRemoveMembersDialogOpen] = useState(false);
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false);

  const Groups = () => {
    return (
      <List className={classes.groupsList}>
        {groups?.map((groupItem) => (
          <GroupListItem
            key={groupItem.id}
            group={groupItem}
            onRequestDeleteGroup={(group) => {
              setSelectedGroup(group);
              setDeleteGroupDialogOpen(true);
            }}
            onRequestAddMembersToGroup={(group) => {
              setSelectedGroup(group);
              setAddMembersDialogOpen(true);
            }}
            onRequestRemoveMembersFromGroup={(group) => {
              setSelectedGroup(group);
              setRemoveMembersDialogOpen(true);
            }}
          />
        ))}
      </List>
    );
  };

  const [selectedGroup, setSelectedGroup] = useState<GroupViewModel>();

  const handleOnDeleteGroupConfirmation = () => {
    setDeleteGroupDialogOpen(false);
    dispatch(deleteGroup(selectedGroup!));
  };

  const handleOnAddMembersToGroupFormSubmission = (
    users: UserViewModel[] | null
  ) => {
    setAddMembersDialogOpen(false);

    //if actually submitted, not dismissed.
    if (users) {
      //dispatch action
    }
  };

  const handleOnRemoveMembersFromGroupFormSubmission = (
    users: UserViewModel[] | null
  ) => {
    setRemoveMembersDialogOpen(false);

    //if actually submitted, not dismissed.
    if (users) {
      //dispatch action
    }
  };

  const AddGroupFab = () => {
    return (
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={() => setIsCreateGroupDialogOpen(true)}
      >
        <Add className={classes.extendedIcon} />
        Create Group
      </Fab>
    );
  };

  return (
    <Spinner loading={isGroupsLoading}>
      <Groups />
      <AddGroupFab />
      <CreateGroupDialog
        open={isCreateGroupDialogOpen}
        onSubmission={handleOnCreateGroupFormSubmission}
      />
      <DeleteGroupConfirmationDialog
        open={deleteGroupDialogOpen}
        onPositive={handleOnDeleteGroupConfirmation}
        onNegative={() => setDeleteGroupDialogOpen(false)}
      />
      {selectedGroup && (
        <AddMembersDialog
          open={addMembersDialogOpen}
          onSubmission={handleOnAddMembersToGroupFormSubmission}
          existedUsersIds={selectedGroup?.memberIds!}
        />
      )}
      {selectedGroup && (
        <RemoveMembersDialog
          open={removeMembersDialogOpen}
          onSubmission={handleOnRemoveMembersFromGroupFormSubmission}
          existedUsersIds={selectedGroup?.memberIds!}
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={4000}
        className={classes.snackBar}
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        message={snackBarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackBarOpen(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Spinner>
  );
}

type DeleteGroupConfirmationDialogProps = {
  open: boolean;
  onPositive: () => void;
  onNegative: () => void;
};

const DeleteGroupConfirmationDialog: FC<DeleteGroupConfirmationDialogProps> = (
  props
) => {
  return (
    <Dialog open={props.open} onClose={() => props.onNegative()}>
      <DialogTitle>Delete Group</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You will no longer be able to restore any of the group data.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onNegative()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.onPositive()} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
