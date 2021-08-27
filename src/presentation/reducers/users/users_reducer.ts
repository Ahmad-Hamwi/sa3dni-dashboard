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
  deleteUserSuccessState,
  deleteUserErrorState,
  clearDeleteUserState,
} from "./users_states";
import { TStore } from "../../store/store";
import UserModel from "../../../infrastructure/model/UserModel";
import {
  changeSelectedUserRole,
  deleteUser,
  getSelectedUser,
  getUsers,
} from "../../actions/users_actions";

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    clearChangeRoleReducer: (state: UsersState) => clearChangeRoleState(state),
    clearDeleteUserReducer: (state: UsersState) => clearDeleteUserState(state),
  },
  extraReducers: {
    [getUsers.pending.type]: (state: UsersState) => usersLoadingState(state),

    [getUsers.fulfilled.type]: (
      state: UsersState,
      { payload }: PayloadAction<UserModel[]>
    ) => usersSuccessState(state, payload),

    [getUsers.rejected.type]: (
      state: UsersState,
      { payload }: PayloadAction<Error>
    ) => usersErrorState(state, payload),

    [getSelectedUser.pending.type]: (state) => selectedUserLoadingState(state),

    [getSelectedUser.fulfilled.type]: (
      state: UsersState,
      { payload }: PayloadAction<UserModel>
    ) => selectedUserSuccessState(state, payload),

    [getSelectedUser.rejected.type]: (
      state: UsersState,
      { payload }: PayloadAction<Error>
    ) => selectedUserErrorState(state, payload),

    [changeSelectedUserRole.fulfilled.type]: (
      state: UsersState,
      action: PayloadAction<UserModel>
    ) => {
      changeRoleSuccessState(state, action.payload);
    },
    [changeSelectedUserRole.rejected.type]: (state: UsersState, { error }) => {
      changeRoleErrorState(state, error);
    },

    [deleteUser.fulfilled.type]: (
      state: UsersState,
      action: PayloadAction<UserModel>
    ) => {
      deleteUserSuccessState(state, action.payload);
    },
    [deleteUser.rejected.type]: (state: UsersState, { error }) => {
      deleteUserErrorState(state, error);
    },
  },
});

export const { clearChangeRoleReducer } = usersSlice.actions;

export const usersSliceReducer = usersSlice.reducer;

export const usersSelector = (store: TStore) => store.users;
