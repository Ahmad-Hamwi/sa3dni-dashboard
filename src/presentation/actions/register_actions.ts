import { resolveService } from "../../di/injection";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type RegisterArgs = {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
};

export const register = createAsyncThunk(
  "auth/register",
  async (args: RegisterArgs, thunkAPI) => {
    const service = resolveService.authService();

    const registerResult = await service.register(args);

    const success: boolean = !!registerResult;

    if (!success) {
      thunkAPI.rejectWithValue(new Error("Error registering company"));
    }
  }
);
