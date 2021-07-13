import animationData from "../../assets/ticket-loading-lottie-file.json";
import Lottie from "react-lottie";
import { createStyles, makeStyles } from "@material-ui/core";

export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = makeStyles(() =>
  createStyles({
    center: {
      width: 200,
      height: 200,
      position: "absolute",
      top: "50%",
      left: "50%",
      margin: "-100px 0px 0px -100px",
    },
  })
);

export const TicketLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.center}>
      <Lottie
        options={defaultOptions}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
};
