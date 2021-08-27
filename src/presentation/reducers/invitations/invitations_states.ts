import {InvitationResult} from "../../../infrastructure/repository/invitation/IInvitationRepository";
import InvitationViewModel from "../../viewmodel/invitation/InvitationViewModel";

export interface InvitationsState {
  invitations?: InvitationViewModel[];
  isLoading: boolean;
  error?: Error;
  isInviting?: boolean;
  inviteResults?: InvitationResult[],
  invitationErrors?: Error[],
}

export const invitationsInitialState: InvitationsState = {
  isLoading: false,
};

export const invitationsSuccessState = (
  state: InvitationsState,
  invitations: InvitationViewModel[]
): InvitationsState => {
  state.invitations = invitations;
  state.isLoading = false;
  state.error = undefined;
  return state;
};

export const invitationsErrorState = (
  state: InvitationsState,
  error: Error
): InvitationsState => {
  state.error = error;
  state.isLoading = false;
  return state;
};

export const invitationsLoadingState = (
  state: InvitationsState
): InvitationsState => {
  state.isLoading = true;
  return state;
};
