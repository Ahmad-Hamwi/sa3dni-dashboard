import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  invitationsErrorState,
  invitationsInitialState,
  invitationsLoadingState,
  InvitationsState,
  invitationsSuccessState,
} from "./invitations_states";
import { fetchInvitations } from "../../actions/invitations_actions";
import { TStore } from "../../store/store";
import { IInvitation } from "../../../domain/entity/Invitation";

const invitationsSlice = createSlice({
  name: "invitations",
  initialState: invitationsInitialState,
  reducers: {

  },
  extraReducers: {
    [fetchInvitations.fulfilled.type]: (
      state: InvitationsState,
      action: PayloadAction<IInvitation[]>
    ) => {
      invitationsSuccessState(state, action.payload);
    },
    [fetchInvitations.pending.type]: (state: InvitationsState, action) => {
      invitationsLoadingState(state);
    },
    [fetchInvitations.rejected.type]: (state: InvitationsState, { error }) => {
      invitationsErrorState(state, error);
    },
  },
});

export const invitationsSliceReducer = invitationsSlice.reducer;

export const invitationsSelector = (store: TStore) => store.invitations;
