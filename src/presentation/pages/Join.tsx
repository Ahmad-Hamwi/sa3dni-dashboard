import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
  createStyles,
  Theme,
  Card,
  TextField,
  Box,
  LinearProgress,
} from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { joinSelector } from "../reducers/join/join_reducer";
import { joinWorkspace } from "../actions/join_actions";
import { Routes } from "../route/routes";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    card__join: {
      borderRadius: theme.spacing(1),
    },

    form__join: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      "& .MuiTextField-root": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  })
);

const Join = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector(joinSelector);

  const history = useHistory();

  const handleClick = () => {
    dispatch(
      joinWorkspace({
        email,
        password,
        name: fullName,
        phoneNumber,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.replace(Routes.LOGIN);
    }
  }, [history, success]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const classes = styles();

  const JoinAppBar = () => {
    return (
      <AppBar position="fixed" variant="outlined">
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h6">Join a workspace</Typography>
          </Box>
          <Button
            variant="text"
            color="inherit"
            component={Link}
            to={Routes.LOGIN}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <div>
      <Toaster />
      <JoinAppBar/>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card className={classes.card__join} variant="outlined">
          {isLoading && <LinearProgress />}
          <Box
            p={6}
            display="flex"
            flexDirection="column"
            width={450}
            minHeight={550}
          >
            <Box display="flex" justifyContent="center">
              <Typography variant="h5">Join Workspace</Typography>
            </Box>
            <Box flex={1}>
              <form className={classes.form__join}>
                <Box display="flex" flexDirection="column">
                  <TextField
                    variant="outlined"
                    label="Business Email"
                    type={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Phone"
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Full Name"
                    onChange={(event) => {
                      setFullName(event.target.value);
                    }}
                  />
                </Box>
              </form>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleClick}>
                Join Workspace
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default Join;
