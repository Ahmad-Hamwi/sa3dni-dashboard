import { FC, FunctionComponent, PropsWithChildren } from "react";
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    agentsList: {
      padding: 0,
    },

    loadingContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  })
);

export type SpinnerProps = {
  loading: boolean;
};

export const Spinner: FunctionComponent<SpinnerProps> = (props) => {
  const classes = useStyles();

  return props.loading ? (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  ) : (
    <div>{props.children}</div>
  );
};
