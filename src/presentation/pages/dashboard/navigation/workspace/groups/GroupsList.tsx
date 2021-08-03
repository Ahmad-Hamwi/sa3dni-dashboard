import {
  List,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
  Fab,
} from "@material-ui/core";

import GroupListItem from "../../../../../components/groups/GroupsListItem";
import { useDispatch, useSelector } from "react-redux";
import { groupsSelector } from "../../../../../reducers/groups/groups_reducers";
import {
  groupsErrorState,
  GroupsState,
} from "../../../../../reducers/groups/groups_states";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import { useEffect, useState } from "react";
import { getGroups } from "../../../../../actions/groups_actions";
import { toast } from "react-hot-toast";
import { Add } from "@material-ui/icons";
import CreateGroupDialog, { CreateGroupForm } from "./CreateGroupDialog";
import { InviteAgentForm } from "../agents/InviteAgentDialog";
import { inviteUser } from "../../../../../actions/invitations_actions";

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
  })
);

export default function GroupsList() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isGroupsLoading, groupsError, groups } = useSelector(groupsSelector);

  useEffect(() => {
    if (groups) return;
    dispatch(getGroups());
  }, [groups, dispatch]);

  useEffect(() => {
    if (groupsError) toast.error(groupsError.message);
  }, [groupsError]);

  const handleOnCreateGroupFormSubmission = (
    createForm: CreateGroupForm | null
  ) => {
    setIsCreateGroupDialogOpen(false);

    //if actually submitted, not dismissed.
    if (createForm) {
    }
  };

  const Groups = () => {
    return (
      <List className={classes.groupsList}>
        {groups?.map((groupItem) => (
          <GroupListItem key={groupItem.id} group={groupItem} />
        ))}
      </List>
    );
  };

  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false);

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
    </Spinner>
  );
}
