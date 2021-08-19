import { UserActiveStatus } from "../../../domain/entity/UserActiveStatus";
import {
  Avatar,
  Badge,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { IUser } from "../../../domain/entity/User";
import {FC} from "react";

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

export type FlexItemAgentProps = {
  user: IUser;
};

const FlexItemAgent: FC<FlexItemAgentProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      className={classes.memberFlexItem}
    >
      {user.userStatus! === UserActiveStatus.ACTIVE ? (
        <OnlineBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar className={classes.avatar}>
            {user.name[0].toUpperCase()}
          </Avatar>
        </OnlineBadge>
      ) : user.userStatus! === UserActiveStatus.BUSY ? (
        <BusyBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
        </BusyBadge>
      ) : user.userStatus! === UserActiveStatus.OFFLINE ? (
        <OfflineBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
        </OfflineBadge>
      ) : null}
      <Typography className={classes.memberFlexItemText}>
        {user.name}
      </Typography>
    </Box>
  );
};

export default FlexItemAgent;
