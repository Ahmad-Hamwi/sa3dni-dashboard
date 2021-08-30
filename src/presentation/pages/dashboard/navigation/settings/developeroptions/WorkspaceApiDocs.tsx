import {makeStyles} from "@material-ui/core/styles";
import {Box, createStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  }
}));

const WorkspaceApiDocs = () => {
  const classes = useStyles();
  return <Box className={classes.root}>
    <Typography></Typography>
    <Typography></Typography>
    <Typography></Typography>
    <Typography></Typography>
    <Typography></Typography>
  </Box>;
};

export default WorkspaceApiDocs;