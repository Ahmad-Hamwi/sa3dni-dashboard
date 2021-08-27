import { resolveService } from "../../di/injection";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type LoginArgs = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  "auth/login",
  async (args: LoginArgs, thunkAPI) => {
    const authService = resolveService.authService();

    const loginResult = await authService.login(args.email, args.password);

    const cachingResult = await authService.saveToken(loginResult.token);
  }
);