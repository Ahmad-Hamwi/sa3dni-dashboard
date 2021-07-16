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

const OnlineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const BusyBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#D93131",
      color: "#D93131",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const OfflineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#A8A8A8",
      color: "#A8A8A8",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

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

  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },

  memberFlexItem: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  memberFlexItemText: {
    color: theme.palette.secondary.contrastText,
    fontWeight: 500,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export enum Status {
  ONLINE,
  BUSY,
  OFFLINE,
}

export interface User {
  name: String;
  status: Status;
}

export interface GroupMembersProps {
  users: User[];
}

const GroupMembers: FC<GroupMembersProps> = (props: GroupMembersProps) => {
  const classes = useStyles();

  const members: User[] = [
    {
      name: "Ahmad Hamwi",
      status: Status.ONLINE,
    },
    {
      name: "Mouaz Kassm",
      status: Status.OFFLINE,
    },
    {
      name: "Abdulrahman Tayara",
      status: Status.BUSY,
    },
    {
      name: "Mohammad Shatara",
      status: Status.ONLINE,
    },
    {
      name: "Mohamamad Nofal",
      status: Status.BUSY,
    },
  ];

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
        {members.map((member) => (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={classes.memberFlexItem}
          >
            {member.status == Status.ONLINE ? (
              <OnlineBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar className={classes.avatar}>{member.name[0]}</Avatar>
              </OnlineBadge>
            ) : member.status == Status.BUSY ? (
              <BusyBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar className={classes.avatar}>{member.name[0]}</Avatar>
              </BusyBadge>
            ) : member.status == Status.OFFLINE ? (
              <OfflineBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar className={classes.avatar}>{member.name[0]}</Avatar>
              </OfflineBadge>
            ) : null}
            <Typography className={classes.memberFlexItemText}>
              {member.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default GroupMembers;