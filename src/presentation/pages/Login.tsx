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
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearState, loginSelector } from "../reducers/login/login_reducer";
import { toast, Toaster } from "react-hot-toast";
import { login } from "../actions/login_actions";
import { Routes } from "../route/routes";
import { authenticateUser } from "../actions/auth_actions";
import { authSelector } from "../reducers/app/auth/auth_reducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card__login: {
      borderRadius: theme.spacing(1),
    },

    form__login: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      "& .MuiTextField-root": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  })
);

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(loginSelector);
  const { isUserAuthenticated } = useSelector(authSelector);

  const history = useHistory();

  const handleClick = () => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    if (success) {
      dispatch(authenticateUser());
    }

    return () => {
      dispatch(clearState());
    };
  }, [dispatch, error, success]);

  useEffect(() => {
    if (isUserAuthenticated === true) {
      history.replace(Routes.DASHBOARD);
    }
  }, [isUserAuthenticated, history]);

  const classes = useStyles();

  return (
    <div>
      <Toaster />
      <AppBar position="fixed" variant="outlined">
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h6">Login</Typography>
          </Box>
          <Button
            variant="text"
            color="inherit"
            component={Link}
            to={Routes.REGISTER_OWNER}
          >
            Register a company
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card className={classes.card__login} variant="outlined">
          {isLoading && <LinearProgress />}
          <Box p={6} display="flex" flexDirection="column" width={450}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5">Login</Typography>
            </Box>
            <Box flex={1}>
              <form className={classes.form__login}>
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
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Box>
              </form>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="text"
                component={Link}
                to={Routes.REGISTER_OWNER}
              >
                Register Owner
              </Button>
              {
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Next
                </Button>
              }
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
