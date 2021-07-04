import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
  createStyles,
  Theme,
  Card,
  CircularProgress,
  TextField,
  Box,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearState, registerSelector } from "./redux/reducer";
import { register } from "./redux/actions";
import { Routes } from "../../../route/routes";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    card__register: {
      borderRadius: theme.spacing(1),
    },

    form__register: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      "& .MuiTextField-root": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  })
);

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector(registerSelector);

  const handleClick = () => {
    dispatch(
      register({
        email,
        password,
        fullName,
        companyName,
        phoneNumber,
      })
    );
  };

  useEffect(() => {
    if (error) {
      dispatch(clearState());
    }

    if (success) {
      dispatch(clearState());
    }

    return () => {
      dispatch(clearState());
    };
  }, [dispatch, error, success]);

  const classes = styles();

  return (
    <div>
      {!success ? (
        <div>
          <AppBar position="fixed" variant="outlined">
            <Toolbar>
              <Box flexGrow={1}>
                <Typography variant="h6">Register a company</Typography>
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
          {!isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <Card className={classes.card__register} variant="outlined">
                <Box
                  p={6}
                  display="flex"
                  flexDirection="column"
                  width={450}
                  minHeight={550}
                >
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h5">Register Your Company</Typography>
                  </Box>
                  <Box flex={1}>
                    <form className={classes.form__register}>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          variant="outlined"
                          label="Business Email"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                        />
                        <TextField
                          variant="outlined"
                          label="Workspace Name"
                          onChange={(event) => {
                            setCompanyName(event.target.value);
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
                  <Box display="flex" justifyContent="space-between">
                    <Button variant="text" component={Link} to={Routes.LOGIN}>
                      Sign in instead
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClick}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          ) : (
            <CircularProgress color="primary" />
          )}{" "}
        </div>
      ) : (
        <h1>Registered</h1>
      )}
    </div>
  );
};

export default Register;
