import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveService } from "../../di/injection";

export type JoinWorkspaceArgs = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
};

export const joinWorkspace = createAsyncThunk<any, JoinWorkspaceArgs>(
  "users/joinWorkspace",
  async (args, _) => {
    return resolveService.authService().registerAgent(args);
  }
);