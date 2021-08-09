import { Box, Divider, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    eventText: {
      fontsize: 16,
      fontWeight: 300,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      alignSelf: "center",
    },

    divider: {
      flexGrow: 1,
    },
  })
);

const EventMessage = () => {
  const classes = useStyles();

  return (
    <Box display={"flex"} flexDirection={"column"} mt={2}>
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <Divider orientation={"horizontal"} className={classes.divider} />
        <Typography className={classes.eventText}>
          6/16/2021 - 06:41:35 pm
        </Typography>
        <Divider orientation={"horizontal"} className={classes.divider} />
      </Box>
      <Typography className={classes.eventText}>Chat started</Typography>
    </Box>
  );
};

export default EventMessage;
