import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveRepository } from "../../di/injection";

export const getCompanyApiKey = createAsyncThunk(
  "company/getCompanyApiKey",
  async (_, __) => {
    console.log("actioning");
    const repository = resolveRepository.company();
    return repository.getCompanyApiKey();
  }
);
