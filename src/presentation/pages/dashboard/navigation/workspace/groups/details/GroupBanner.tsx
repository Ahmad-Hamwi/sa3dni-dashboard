import { makeStyles, Theme, Avatar, Typography } from "@material-ui/core";
import { FC } from "react";

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
    border: `3px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    fontSize: 48,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  banner: {
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

export interface GroupBannerProps {
  groupName: String;
}

const GroupBanner: FC<GroupBannerProps> = (props: GroupBannerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Avatar className={classes.avatar}>{props.groupName[0]}</Avatar>
      <div className={classes.nameArea}>
        <Typography className={classes.roleText} variant="h6">
          {props.groupName}
        </Typography>
      </div>
    </div>
  );
};

export default GroupBanner;
