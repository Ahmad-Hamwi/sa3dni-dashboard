import { makeStyles, Theme, Typography } from "@material-ui/core";
import { IGroup } from "../../../domain/entity/Group";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
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

export type SquaredGroupProps = {
  group: IGroup;
};

const FlexItemGroup: FC<SquaredGroupProps> = ({ group }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.groupFlexItem}>{group.name}</Typography>
  );
};

export default FlexItemGroup;
