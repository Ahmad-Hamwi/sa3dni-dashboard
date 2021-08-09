import { Toaster } from "react-hot-toast";
import { Box, Divider } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ChatsList from "./ChatsList";
import OpenedChat from "./OpenedChat";

const useStyles = makeStyles((theme: Theme) => ({
  verticalDivider: {
    height: `calc(100vh - ${theme.spacing(6)-2}px)`,
  },
}));

const Chats = () => {
  const classes = useStyles();

  return (
    <div>
      <Toaster />
      <Box display="flex" flexDirection="row">
        <ChatsList />
        <Divider orientation="vertical" className={classes.verticalDivider} />
        <OpenedChat />
      </Box>
    </div>
  );
};

export default Chats;
