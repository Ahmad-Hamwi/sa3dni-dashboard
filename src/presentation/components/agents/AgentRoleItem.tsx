import { UserRole } from "../../../domain/entity/UserRole";
import React, { FunctionComponent } from "react";
import { Star, VerifiedUser } from "@material-ui/icons";
import { Box, Typography, useTheme } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    roleText: {
      fontWeight: 500,
      padding: theme.spacing(1),
    },
  });
});

export type AgentRoleItemProps = {
  role: UserRole;
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
      {props.role === UserRole.OWNER ? (
        <Star />
      ) : props.role === UserRole.ADMIN ? (
        <VerifiedUser />
      ) : null}
      <Typography className={classes.roleText}>
        {props.role === UserRole.OWNER
          ? "Owner"
          : props.role === UserRole.ADMIN
          ? "Admin"
          : props.role === UserRole.AGENT
          ? "Agent"
          : null}
      </Typography>
    </Box>
  );
};

export { AgentRoleItem };
