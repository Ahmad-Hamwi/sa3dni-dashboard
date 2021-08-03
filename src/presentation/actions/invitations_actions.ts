import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveRepository } from "../../di/injection";
import {InviteAgentForm} from "../pages/dashboard/navigation/workspace/agents/InviteAgentDialog";
import {CreateInvitationParams} from "../../domain/gateway/IInvitationRepository";

export const fetchInvitations = createAsyncThunk(
  "fetchInvitations",
  async (args, thunkApi) => {
    const repo = resolveRepository.invitations();

    return await repo.getAll();
  }
);

export const inviteUser = createAsyncThunk(
  "inviteUser",
  async (inviteForm: InviteAgentForm) => {
      const inviteRequest: CreateInvitationParams = {
          email: inviteForm.email,
          isAdmin: inviteForm.isAdmin,
          groupIds: inviteForm.groups.map(group => group.id)
      }
      return await resolveRepository.invitations().create(inviteRequest);
  }
);
