import {
  Typography,
  Box,
  Theme,
  makeStyles,
  withStyles,
  createStyles,
  Badge,
  Avatar,
} from "@material-ui/core";
import { FC } from "react";
import { IUser } from "../../../domain/entity/User";
import { UserActiveStatus } from "../../../domain/entity/UserActiveStatus";
import FlexItemAgent from "../agents/FlexItemAgent";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    margin: theme.spacing(3),
  },

  list: {
    margin: theme.spacing(0.5),
  },

  title: {
    margin: theme.spacing(1),
  },
}));

export interface GroupMembersProps {
  users?: IUser[];
}

const GroupMembers: FC<GroupMembersProps> = ({ users }: GroupMembersProps) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.title}>
        <Typography variant="h6">Members</Typography>
      </div>
      <Box
        display="flex"
        flexDirection="row"
        className={classes.list}
        flexWrap="wrap"
      >
        {users?.map((user) => (
          <FlexItemAgent user={user} />
        ))}
      </Box>
    </div>
  );
};

export default GroupMembers;
