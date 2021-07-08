import {
  List,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";

import GroupListItem from "./GroupsListItem";

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

  const groups = [
    {
      id: 1,
      groupName: "General",
    },

    {
      id: 2,
      groupName: "Misc",
    },

    {
      id: 3,
      groupName: "Some Other Group",
    },
  ];

  return (
    <>
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
      <List className={classes.groupsList}>
        {groups.map((groupItem) => (
          <GroupListItem
            key={groupItem.id}
            id={groupItem.id}
            groupName={groupItem.groupName}
          />
        ))}
      </List>
    </>
  );
}
