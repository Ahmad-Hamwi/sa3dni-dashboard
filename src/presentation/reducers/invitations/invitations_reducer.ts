import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  invitationsErrorState,
  invitationsInitialState,
  invitationsLoadingState,
  InvitationsState,
  invitationsSuccessState,
} from "./invitations_states";
import {
  fetchInvitations,
  inviteUser,
} from "../../actions/invitations_actions";
import { TStore } from "../../store/store";
import { InvitationResult } from "../../../infrastructure/repository/invitation/IInvitationRepository";
import InvitationModel from "../../../infrastructure/model/InvitationModel";

const invitationsSlice = createSlice({
  name: "invitations",
  initialState: invitationsInitialState,
  reducers: {
    clearInviteUserState: (state) => {
      state.inviteResults = undefined;
      state.invitationErrors = undefined;
    },
  },
  extraReducers: {
    [fetchInvitations.fulfilled.type]: (
      state: InvitationsState,
      action: PayloadAction<InvitationModel[]>
    ) => {
      invitationsSuccessState(state, action.payload);
    },
    [fetchInvitations.pending.type]: (state: InvitationsState, action) => {
      invitationsLoadingState(state);
    },
    [fetchInvitations.rejected.type]: (state: InvitationsState, { error }) => {
      invitationsErrorState(state, error);
    },

    [inviteUser.pending.type]: (state: InvitationsState) => {
      state.isInviting = true;
    },
    [inviteUser.fulfilled.type]: (
      state,
      action: PayloadAction<InvitationResult[]>
    ) => {
      state.isInviting = false;
      state.inviteResults = action.payload;
    },
    [inviteUser.rejected.type]: (state, { payload }) => {
      state.isInviting = false;
      state.invitationErrors = payload;
    },
  },
});

export const { clearInviteUserState } = invitationsSlice.actions;

export const invitationsSliceReducer = invitationsSlice.reducer;

export const invitationsSelector = (store: TStore) => store.invitations;
