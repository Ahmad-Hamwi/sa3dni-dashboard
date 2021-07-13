import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import WorkspaceListSection from "./WorkspaceListSection";
import WorkspaceInfoSection from "./WorkspaceInfoSection";

const useStyles = makeStyles((theme: Theme) => ({
  verticalDivier: {
    height: `calc(100vh - ${theme.spacing(6)}px)`,
  },
}));

export default function Workspace() {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <WorkspaceListSection />
      <Divider orientation="vertical" className={classes.verticalDivier} />
      <WorkspaceInfoSection />
    </Box>
  );
}
