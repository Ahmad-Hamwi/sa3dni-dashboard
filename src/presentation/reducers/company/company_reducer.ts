import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState, initialState } from "./company_state";
import { getCompanyApiKey } from "../../actions/company_actions";
import { TStore } from "../../store/store";

const companySlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getCompanyApiKey.pending.type]: (state: CompanyState) => {
      state.loading = true;
    },

    [getCompanyApiKey.fulfilled.type]: (
      state: CompanyState,
      { payload }: PayloadAction<string>
    ) => {
      state.loading = false;
      state.apiKey = payload;
    },
  },
});

export const companyReducer = companySlice.reducer;

export const companySelector = (store: TStore) => store.company;
