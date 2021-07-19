import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveRepository } from "../../di/injection";

export const fetchInvitations = createAsyncThunk(
  "fetchInvitations",
  async (args, thunkApi) => {
    const repo = resolveRepository.invitations();

    return await repo.getAll();
  }
);
