import { Typography, Box, Card, Theme, makeStyles } from "@material-ui/core";
import { FC } from "react";
import { IGroup } from "../../../domain/entity/Group";
import FlexItemGroup from "../groups/FlexItemGroup";

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

export interface AgentGroupsProps {
  groups: IGroup[];
}

const AgentGroups: FC<AgentGroupsProps> = (props: AgentGroupsProps) => {
  const classes = useStyles();

  console.log(props.groups);

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
          <FlexItemGroup group={group} />
        ))}
      </Box>
    </div>
  );
};

export default AgentGroups;
