import { resolveRepository } from "../../di/injection";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async () => {
    return await resolveRepository.users().me();
  }
);