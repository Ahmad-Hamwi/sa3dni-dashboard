import { Typography, Box, Card, Theme, makeStyles } from "@material-ui/core";
import { FC } from "react";
import {IGroup} from "../../../domain/entity/Group";

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

  groupFlexItem: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    background: theme.palette.primary.main,
    borderWidth: "1px",
    border: "1px solid #707070",
    borderRadius: theme.spacing(0.5),
    color: theme.palette.primary.contrastText,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
    fontWeight: 500,
  },
}));

export interface AgentGroupsProps {
  groups: IGroup[];
}

const AgentGroups: FC<AgentGroupsProps> = (props: AgentGroupsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.title}>
        <Typography variant="h6">Groups</Typography>
      </div>
      <Box
        display="flex"
        flexDirection="row"
        className={classes.list}
        flexWrap="wrap"
      >
        {props.groups.map((group) => (
          <Typography className={classes.groupFlexItem}>
            {group.name}
          </Typography>
        ))}
      </Box>
    </div>
  );
};

export default AgentGroups;
