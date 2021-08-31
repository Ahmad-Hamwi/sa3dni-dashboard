import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchInvitations } from "../../../../../actions/invitations_actions";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import { invitationsSelector } from "../../../../../reducers/invitations/invitations_reducer";
import InviteListItem from "../../../../../components/invites/InviteListItem";
import { Divider, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  noInvitesText: {
    height: `calc(100vh - ${theme.spacing(13)}px)`,
    lineHeight: `calc(100vh - ${theme.spacing(13)}px)`,
    textAlign: "center",
    fontWeight: 500,
  },
}));

const InvitesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isLoading, invitations } = useSelector(invitationsSelector);

  useEffect(() => {
    if (invitations) return;
    dispatch(fetchInvitations());
  }, [dispatch]);

  const invitationsList =
    invitations?.map((invitation) => {
      return (
        <div>
          <InviteListItem key={invitation.id} invitation={invitation} />
          <Divider />
        </div>
      );
    }) || [];

  console.log(invitations);

  return (
    <Spinner loading={isLoading}>
      {invitations?.length !== 0 ? (
        invitationsList
      ) : (
        <Typography className={classes.noInvitesText}>
          No ongoing invites right now
        </Typography>
      )}
    </Spinner>
  );
};

export default InvitesList;
