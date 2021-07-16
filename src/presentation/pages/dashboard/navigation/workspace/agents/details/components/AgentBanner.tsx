import {
  makeStyles,
  Theme,
  Box,
  withStyles,
  createStyles,
  Badge,
  Avatar,
  Typography,
} from "@material-ui/core";
import { VerifiedUser, Star } from "@material-ui/icons";
import { FC } from "react";

const OnlineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      borderRadius: theme.spacing(2),
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  })
)(Badge);

const BusyBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      borderRadius: theme.spacing(2),
      backgroundColor: "#D93131",
      color: "#D93131",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const OfflineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      borderRadius: theme.spacing(2),
      backgroundColor: "#A8A8A8",
      color: "#A8A8A8",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  })
)(Badge);

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
    padding: theme.spacing(4),
  },
  nameArea: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
  roleText: {
    fontWeight: 500,
    padding: theme.spacing(0.5),
  },
  role: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
}));

export enum Status {
  ONLINE,
  BUSY,
  OFFLINE,
}

export enum Role {
  OWNER,
  ADMIN,
  NORMAL,
}

export interface AgentBannerProps {
  status: Status;
  username: String;
  jobTitle: String;
  email: String;
  role: Role;
}

const AgentBanner: FC<AgentBannerProps> = (props: AgentBannerProps) => {
  const classes = useStyles();

  const avatar = <Avatar className={classes.avatar}>A</Avatar>;

  return (
    <div className={classes.banner}>
      {props.status == Status.ONLINE ? (
        <OnlineBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          variant="dot"
        >
          {avatar}
        </OnlineBadge>
      ) : props.status == Status.BUSY ? (
        <BusyBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          variant="dot"
        >
          {avatar}
        </BusyBadge>
      ) : props.status == Status.OFFLINE ? (
        <OfflineBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          variant="dot"
        >
          {avatar}
        </OfflineBadge>
      ) : null}
      <div className={classes.nameArea}>
        <Box display="flex" flexDirection="row">
          <Typography className={classes.roleText}>{props.username}</Typography>
          <Box className={classes.role}>
            {props.role == Role.OWNER ? (
              <Star />
            ) : props.role == Role.ADMIN ? (
              <VerifiedUser />
            ) : null}
            <Typography className={classes.roleText}>
              {props.role == Role.OWNER
                ? "Owner"
                : props.role == Role.ADMIN
                ? "Admin"
                : props.role == Role.NORMAL
                ? null
                : null}
            </Typography>
          </Box>
        </Box>

        <Typography className={classes.roleText}>{props.jobTitle}</Typography>
        <Typography className={classes.roleText}>{props.email}</Typography>
      </div>
    </div>
  );
};

export default AgentBanner;
