import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { companySelector } from "../../../../../reducers/company/company_reducer";
import { SyntheticEvent, useEffect, useState } from "react";
import { getCompanyApiKey } from "../../../../../actions/company_actions";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(4),
    },
    title: {
      fontWeight: 500,
    },
    wrapper: {
      marginBlock: theme.spacing(1.5),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    apiTextField: {
      minWidth: theme.spacing(30),
      minHeight: theme.spacing(6.5),
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(1.5),
      marginInlineEnd: theme.spacing(4),
    },
    copyButton: {
      width: theme.spacing(8),
      height: theme.spacing(5),
    },
    progress: {
      margin: theme.spacing(0.5),
    },
    snackBar: {
      marginInline: theme.spacing(54),
    },
  })
);

const WorkspaceAPI = () => {
  const classes = useStyles();

  const [snackBarOpen, SetSnackBarOpen] = useState(false);

  const handleClick = () => {
    SetSnackBarOpen(true);
  };

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    SetSnackBarOpen(false);
  };

  const dispatch = useDispatch();

  const { loading, apiKey } = useSelector(companySelector);

  useEffect(() => {
    dispatch(getCompanyApiKey());
  }, [apiKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey!);
    SetSnackBarOpen(true);
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Workspace API Key:</Typography>
      <Box className={classes.wrapper}>
        <Typography className={classes.apiTextField}>{apiKey}</Typography>
        <Button
          color={"primary"}
          className={classes.copyButton}
          variant={"contained"}
          disabled={loading}
          onClick={handleCopy}
        >
          {loading ? (
            <CircularProgress size={"1rem"} className={classes.progress} />
          ) : (
            <Box>Copy</Box>
          )}
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={4000}
        className={classes.snackBar}
        open={snackBarOpen}
        onClose={handleClose}
        message="Api Key is copied to Clipboard!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default WorkspaceAPI;
