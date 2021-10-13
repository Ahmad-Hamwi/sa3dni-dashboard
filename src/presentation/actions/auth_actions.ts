import { resolveRepository, resolveService } from "../../di/injection";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Exception } from "../../infrastructure/exception/Exception";

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async (_, thunkAPI) => {
    const token = await resolveService.authService().getToken();
    if (token) {
      const user = await resolveRepository.users().me();
      return {
        user,
        token,
      };
    } else {
      throw new Exception(-1, "Token not cached");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await resolveService.authService().removeToken();
  return;
});
