import React, { FunctionComponent } from "react";
import { Star, VerifiedUser } from "@material-ui/icons";
import { Box, Typography, useTheme } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {Role} from "../../../infrastructure/model/UserModel";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    roleText: {
      fontWeight: 500,
      padding: theme.spacing(1),
    },
  });
});

export type AgentRoleItemProps = {
  role: Role;
};

const AgentRoleItem: FunctionComponent<AgentRoleItemProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="row"
      mx={theme.spacing(1)}
      alignItems="center"
    >
      {props.role === Role.OWNER ? (
        <Star />
      ) : props.role === Role.ADMIN ? (
        <VerifiedUser />
      ) : null}
      <Typography className={classes.roleText}>
        {props.role === Role.OWNER
          ? "Owner"
          : props.role === Role.ADMIN
          ? "Admin"
          : props.role === Role.AGENT
          ? "Agent"
          : null}
      </Typography>
    </Box>
  );
};

export { AgentRoleItem };
