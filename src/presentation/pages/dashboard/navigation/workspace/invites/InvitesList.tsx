import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchInvitations } from "../../../../../actions/invitations_actions";
import { Spinner } from "../../../../../components/app/loader/Spinner";
import { invitationsSelector } from "../../../../../reducers/invitations/invitations_reducer";
import InviteListItem from "../../../../../components/invites/InviteListItem";
import { Divider } from "@material-ui/core";

const InvitesList = () => {
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

  return <Spinner loading={isLoading}>{invitationsList}</Spinner>;
};

export default InvitesList;
