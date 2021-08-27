import {
  Card,
  makeStyles,
  Theme,
  Divider,
} from "@material-ui/core";
import { FC, useEffect } from "react";
import GroupBanner from "../../../../../components/groupdetails/GroupBanner";
import GroupMembers from "../../../../../components/groupdetails/GroupMembers";
import GroupPerformance from "../../../../../components/groupdetails/GroupPerfomance";
import { useDispatch, useSelector } from "react-redux";
import { groupsSelector } from "../../../../../reducers/groups/groups_reducers";
import { getSelectedGroup } from "../../../../../actions/groups_actions";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import { toast } from "react-hot-toast";

const useStyles = makeStyles((theme: Theme) => ({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  card: {
    width: "90%",
    height: "auto",
    margin: `${theme.spacing(8)}px auto`,
    background: theme.palette.secondary.main,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    fontSize: 48,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  banner: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(6),
  },
  nameArea: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
  roleText: {
    fontWeight: 500,
    padding: theme.spacing(1),
  },
  role: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
}));

export interface GroupDetailsProps {
  selectedGroupId: string;
}

const GroupDetails: FC<GroupDetailsProps> = ({ selectedGroupId }: GroupDetailsProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isSelectedGroupLoading, selectedGroup, selectedGroupError } =
    useSelector(groupsSelector);

  useEffect(() => {
    dispatch(getSelectedGroup(selectedGroupId));
  }, [selectedGroupId, dispatch]);

  useEffect(() => {
    if (selectedGroupError) toast.error(selectedGroupError.message);
  }, [selectedGroupError]);

  return (
    <Spinner loading={isSelectedGroupLoading}>
      {selectedGroup && (
        <Card variant="outlined" className={classes.card}>
          <div className={classes.cardContent}>
            <GroupBanner groupName={selectedGroup.name} />
            <Divider />
            <GroupMembers users={selectedGroup.members} />
            <Divider />
            <GroupPerformance
              totalChatAccepted={64}
              chatSatisfaction={"3/10"}
            />
          </div>
        </Card>
      )}
    </Spinner>
  );
};

export default GroupDetails;
