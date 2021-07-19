import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  usersErrorState,
  usersSuccessState,
  usersInitialState,
  usersLoadingState,
  UsersState,
  selectedUserLoadingState,
  selectedUserSuccessState,
  selectedUserErrorState,
  changeRoleSuccessState,
  changeRoleErrorState,
  clearChangeRoleState,
} from "./users_states";
import { TStore } from "../../store/store";
import { IUser } from "../../../domain/entity/User";
import { changeSelectedUserRole } from "../../actions/users_actions";

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    //all users
    usersLoadingReducer: (state: UsersState) => usersLoadingState(state),

    usersSuccessReducer: (
      state: UsersState,
      { payload }: PayloadAction<IUser[]>
    ) => usersSuccessState(state, payload),

    usersErrorReducer: (state: UsersState, { payload }: PayloadAction<Error>) =>
      usersErrorState(state, payload),

    //selected user details
    selectedUserLoadingReducer: (state: UsersState) =>
      selectedUserLoadingState(state),

    selectedUserSuccessReducer: (
      state: UsersState,
      { payload }: PayloadAction<IUser>
    ) => selectedUserSuccessState(state, payload),

    selectedUserErrorReducer: (
      state: UsersState,
      { payload }: PayloadAction<Error>
    ) => selectedUserErrorState(state, payload),

    clearChangeRoleReducer: (state: UsersState) => clearChangeRoleState(state),
  },
  extraReducers: {
    [changeSelectedUserRole.fulfilled.type]: (
      state: UsersState,
      action: PayloadAction<IUser>
    ) => {
      changeRoleSuccessState(state, action.payload);
    },
    [changeSelectedUserRole.rejected.type]: (state: UsersState, { error }) => {
      changeRoleErrorState(state, error);
    },
  },
});

export const {
  usersLoadingReducer,
  usersSuccessReducer,
  usersErrorReducer,
  selectedUserLoadingReducer,
  selectedUserSuccessReducer,
  selectedUserErrorReducer,
  clearChangeRoleReducer,
} = usersSlice.actions;

export const usersSliceReducer = usersSlice.reducer;

export const usersSelector = (store: TStore) => store.users;
