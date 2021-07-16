import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import WorkspaceListSection from "./WorkspaceListSection";
import WorkspaceInfoSection from "./WorkspaceInfoSection";
import { Toaster } from "react-hot-toast";

const useStyles = makeStyles((theme: Theme) => ({
  verticalDivider: {
    height: `calc(100vh - ${theme.spacing(6)}px)`,
  },
}));

export default function Workspace() {
  const classes = useStyles();

  return (
    <>
      <Toaster />
      <Box display="flex" flexDirection="row">
        <WorkspaceListSection />
        <Divider orientation="vertical" className={classes.verticalDivider} />
        <WorkspaceInfoSection />
      </Box>
    </>
  );
}
