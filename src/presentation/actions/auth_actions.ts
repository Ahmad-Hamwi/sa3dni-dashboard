import { resolveRepository, resolveService } from "../../di/injection";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async (_, thunkAPI) => {
    const user = await resolveRepository.users().me();
    const token = await resolveService.authService().getToken();
    return {
      user,
      token,
    };
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await resolveService.authService().removeToken();
  return;
});
