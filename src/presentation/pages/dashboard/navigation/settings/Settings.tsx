import { Box, Divider } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SettingsListOptions from "./SettingsListOptions";
import SettingsDetails from "./SettingsDetails";

const useStyles = makeStyles((theme) =>
  createStyles({
    verticalDivider: {
      height: `calc(100vh - ${theme.spacing(6) - 2}px)`,
    },
  })
);

const Settings = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <SettingsListOptions />
      <Divider orientation="vertical" className={classes.verticalDivider} />
      <SettingsDetails />
    </Box>
  );
};

export default Settings;
