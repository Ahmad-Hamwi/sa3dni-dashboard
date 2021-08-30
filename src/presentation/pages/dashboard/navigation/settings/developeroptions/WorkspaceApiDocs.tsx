import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  createStyles,
  Divider,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      marginBlock: theme.spacing(4),
      maxWidth: theme.spacing(100),
    },

    header: {
      marginBlock: theme.spacing(2),
    },

    code: {
      marginBlock: theme.spacing(1),
      padding: theme.spacing(2),
    },

    spacer: {
      marginBlock: theme.spacing(1),
    },
  })
);

const WorkspaceApiDocs = () => {
  const classes = useStyles();

  const code: string =
    '<script\n    defer\n    id="chat_script"\n    src="https://sa3dni.herokuapp.com/module/web/sa3dni_chat_cdn.js"\n    api_key="Pc7d8yqrhg39ODp3qF6dHqdRk6aHk3c8kasMAmEyptY="\n    mountId="inject"/>';

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
    >
      <Box className={classes.root}>
        <Typography className={classes.header} variant={"h4"}>
          Module integration for websites
        </Typography>
        <Divider className={classes.spacer} orientation={"horizontal"} />
        <Typography className={classes.spacer} variant={"h6"}>
          Here are the steps for integrating the module in your website:
        </Typography>
        <Typography className={classes.spacer} variant={"body1"}>
          1- Get your workspace API key from{" "}
          <Link
            target="_blank"
            href="https://sa3dni-dashboard.herokuapp.com//dashboard/settings/apiKey"
          >
            Here
          </Link>
        </Typography>
        <Typography className={classes.spacer} variant={"body1"}>
          2- Add JQuery to your website.
        </Typography>
        <Typography className={classes.spacer} variant={"body1"}>
          3- Add chat script at the bottom of your main html file.
        </Typography>
        <Paper variant={"outlined"} className={classes.code}>
          <pre>
            <code>{code}</code>
          </pre>
        </Paper>
        <Typography className={classes.spacer} variant={"h6"}>
          Notes:
        </Typography>
        <Typography className={classes.spacer} variant={"body1"}>
          - api_key attribute is used for passing your own company api key.
        </Typography>
        <Typography className={classes.spacer} variant={"body1"}>
          - mountId attribute is used for specifying a div which the html code
          will be injected to. If no mountId is specified the code will be
          injected to the body.
        </Typography>
        <Box className={classes.header} />
        <Typography className={classes.header} variant={"h4"}>
          Module integration for mobile devices
        </Typography>
        <Divider className={classes.spacer} orientation={"horizontal"} />
        <Typography className={classes.spacer} variant={"h6"}>
          Coming soon...
        </Typography>
      </Box>
    </Box>
  );
};
export default WorkspaceApiDocs;
