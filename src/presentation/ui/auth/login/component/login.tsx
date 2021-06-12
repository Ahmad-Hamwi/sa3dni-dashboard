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
import {useEffect, useState} from "react";
import * as Routes from "../../../../route/Routes";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {clearState, loginSelector} from "../state/login_reducer";
import {toast} from "react-hot-toast";
import {login} from "../state/login_actions";


const styles = makeStyles((theme: Theme) =>
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
    const {isLoading, error, isAuth, isSuccess} =
        useSelector(loginSelector);

    const handleClick = () => {
        dispatch(login(email, password));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState);
        };
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            console.log("this is error effect");
            toast.error(error);
            dispatch(clearState);
        }

        if (isSuccess) {
            dispatch(clearState);
            // push('/'); routing
        }
    }, [error, isSuccess]);

    const classes = styles();

    ///TODO: we should use isAuth here

    return (
        <div>
            <div>
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
                        {isLoading && <LinearProgress/>}
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
                )
            </div>
        </div>
    );
};

export default Login;
