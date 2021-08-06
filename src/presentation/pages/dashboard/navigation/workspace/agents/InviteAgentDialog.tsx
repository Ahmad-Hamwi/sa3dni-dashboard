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
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Send } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { groupsSelector } from "../../../../../reducers/groups/groups_reducers";
import { getGroups } from "../../../../../actions/groups_actions";
import { toast } from "react-hot-toast";
import FlexItemGroup from "../../../../../components/groups/FlexItemGroup";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import ListOfGroupsPopUpMenu from "../../../../../components/groups/ListOfGroupsPopUpMenu";
import { IGroup } from "../../../../../../domain/entity/Group";

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
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      borderRadius: theme.spacing(0.5),
      backgroundColor: "rgb(232, 232, 232)",
      height: theme.spacing(6),
      width: "100%",
    },

    flexWrapper: {
      borderRadius: theme.spacing(0.5),
      backgroundColor: "rgb(232, 232, 232)",
      overflowX: "auto",
      overflowY: "hidden",
    },

    addGroupText: {
      marginLeft: theme.spacing(1),
      whiteSpace: "nowrap",
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
  groups: IGroup[];
}

type SelectionState = {
  selectedGroups: IGroup[];
  remainingGroups: IGroup[];
};

export const InviteAgentDialog: FC<InviteAgentDialogProps> = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selection, setSelection] = useState<SelectionState>({
    selectedGroups: [],
    remainingGroups: [],
  });

  const groupsPopUpState = usePopupState({
    variant: "popper",
    popupId: "GROUPS_POPUP",
  });

  const dispatch = useDispatch();
  const { groups, groupsError } = useSelector(groupsSelector);

  useEffect(() => {
    if (!groups) dispatch(getGroups());
  }, [groups, dispatch]);

  const addGroupToSelected = (group: IGroup) => {
    setSelection((prevState) => {
      return {
        remainingGroups: prevState.remainingGroups.filter(
          (itrGroup: IGroup) => itrGroup.id !== group.id
        ),
        selectedGroups: [...prevState.selectedGroups, group],
      };
    });
  };

  useEffect(() => {
    if (groups) {
      setSelection((prev) => {
        return { ...prev, remainingGroups: groups };
      });

      groups.forEach((group) => {
        if (group.isGeneral) {
          addGroupToSelected(group);
        }
      });
    }
    if (groupsError) toast(groupsError.message);
  }, [groups, groupsError]);

  const handleOnEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAdminCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  const handleClose = () => {
    props.handleOnSubmission(null);
  };

  const handleFormSubmission = () => {
    props.handleOnSubmission({
      email: email,
      isAdmin: isAdmin,
      groups: selection.selectedGroups,
    });
  };

  const handleOnGroupSelectedFromMenu = (group: IGroup) => {
    addGroupToSelected(group);
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
              {email}
            </TextField>
          </Box>
          <Box className={classes.adminSection}>
            <Typography variant={"h6"}>Admin</Typography>
            <div className={classes.adminCheckBoxConatiner}>
              <Checkbox
                className={classes.adminCheckBox}
                checked={isAdmin}
                onChange={handleAdminCheck}
                color="primary"
              />
            </div>
          </Box>
        </Box>
        <Box className={classes.secondSection}>
          <Box className={classes.emailSection}>
            <Typography variant={"h6"}>Group</Typography>
            <Box className={classes.flexWrapper}>
              <Box className={classes.addGroupContainer}>
                {selection.selectedGroups?.map((group) => {
                  return <FlexItemGroup group={group} />;
                })}
                {selection.remainingGroups.length !== 0 && (
                  <>
                    <Button
                      {...bindTrigger(groupsPopUpState)}
                      className={classes.addGroupText}
                    >
                      Add Group
                    </Button>
                    <ListOfGroupsPopUpMenu
                      popupState={groupsPopUpState}
                      groups={selection.remainingGroups}
                      onGroupSelected={handleOnGroupSelectedFromMenu}
                    />
                  </>
                )}
              </Box>
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
