import {
  List,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";

import GroupListItem from "../../../../../components/groups/GroupsListItem";
import { useDispatch, useSelector } from "react-redux";
import { groupsSelector } from "../../../../../reducers/groups/groups_reducers";
import {
  groupsErrorState,
  GroupsState,
} from "../../../../../reducers/groups/groups_states";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import { useEffect } from "react";
import { getGroups } from "../../../../../actions/groups_actions";
import { toast } from "react-hot-toast";

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

  return (
    <Spinner loading={isGroupsLoading}>
      <List className={classes.groupsList}>
        {groups?.map((groupItem) => (
          <GroupListItem key={groupItem.id} group={groupItem} />
        ))}
      </List>
    </Spinner>
  );
}
