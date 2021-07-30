import {
  Box,
  Button,
  Checkbox,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { ChangeEvent, FC, useState } from "react";
import { Send } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstSection: {
      display: "flex",
      flexDirection: "row",
    },

    emailSection: {
      width: theme.spacing(40),
      display: "flex",
      flexDirection: "column",
    },

    emailInput: {
      // "&..MuiFilledInput-root": {
      //   borderBottomRightRadius: theme.spacing(0.5),
      //   borderBottomLeftRadius: theme.spacing(0.5),
      // },
      "&.MuiFilledInput-underline:before": {
        borderBottom: 0,
      },
      "&.MuiFilledInput-underline:hover": {
        borderBottom: 0,
      },
    },

    adminSection: {
      marginLeft: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    adminCheckBoxConatiner: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      borderRadius: theme.spacing(0.5),
      width: theme.spacing(6),
      height: theme.spacing(6),
      backgroundColor: "rgb(232, 232, 232)",
    },

    adminCheckBox: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },

    secondSection: {
      marginTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
    },

    dialogActions: {
      margin: theme.spacing(2),
    },

    addGroupContainer: {
      display: "flex",
      alignItems: "center",
      borderRadius: theme.spacing(0.5),
      backgroundColor: "rgb(232, 232, 232)",
      height: theme.spacing(6),
      width: "100%",
    },

    addGroupText: {
      marginLeft: theme.spacing(2),
      color: theme.palette.text.hint,
    },
  })
);

export type InviteAgentDialogProps = {
  open: boolean;
  handleOnSubmission: (inviteForm: InviteAgentForm | null) => void;
};

export interface InviteAgentForm {
  email: string;
  isAdmin: boolean;
  groupIds: string[];
}

export const InviteAgentDialog: FC<InviteAgentDialogProps> = (props) => {
  const classes = useStyles();

  const [form, setForm] = useState<InviteAgentForm>({
    email: "",
    isAdmin: false,
    groupIds: [],
  });

  const handleOnEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const handleAdminCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return { ...prevState, isAdmin: event.target.checked };
    });
  };

  const handleClose = () => {
    props.handleOnSubmission(null);
  };

  const handleFormSubmission = () => {
    props.handleOnSubmission(form);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="invite-agent-form-dialog"
    >
      <DialogTitle>Invite Agents</DialogTitle>
      <DialogContent>
        <Box className={classes.firstSection}>
          <Box className={classes.emailSection}>
            <Typography variant={"h6"}>Email</Typography>
            <TextField
              className={classes.emailInput}
              label="Email address to invite"
              variant="filled"
              onChange={handleOnEmailChanged}
              size={"small"}
            >
              {form.email}
            </TextField>
          </Box>
          <Box className={classes.adminSection}>
            <Typography variant={"h6"}>Admin</Typography>
            <div className={classes.adminCheckBoxConatiner}>
              <Checkbox
                className={classes.adminCheckBox}
                checked={form.isAdmin}
                onChange={handleAdminCheck}
                color="primary"
              />
            </div>
          </Box>
        </Box>
        <Box className={classes.secondSection}>
          <Box className={classes.emailSection}>
            <Typography variant={"h6"}>Group</Typography>
            <Box className={classes.addGroupContainer}>
              <Typography className={classes.addGroupText}>
                Add Group
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant={"outlined"} onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant={"contained"}
          onClick={handleFormSubmission}
          color="primary"
          endIcon={<Send />}
        >
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
};
