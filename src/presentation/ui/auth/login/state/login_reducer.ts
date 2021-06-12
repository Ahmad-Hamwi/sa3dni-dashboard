import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TStore} from "../../../../redux/store";
import {initialState} from "./login_state";

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isAuth = false;
            state.isLoading = false;
            // state.result = undefined;
            state.error = undefined;
        },
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setAuthSuccess: (
            state,
            {payload}: PayloadAction<undefined>
        ) => {
            // state.result = payload;
            state.isAuth = true;
            state.isSuccess = true;
            state.isLoading = false;
        },
        setAuthFailed: (state, {payload}: PayloadAction<string | undefined>) => {
            state.error = payload;
            state.isAuth = false;
            state.isLoading = false;
        },
    },
});

export const loginReducer = loginSlice.reducer;

export const {
    setAuthSuccess,
    setLoading,
    setAuthFailed,
    clearState,
} = loginSlice.actions;

export const loginSelector = (store: TStore) => store.login;
