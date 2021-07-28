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
import {
  changeSelectedUserRole,
  getSelectedUser,
  getUsers,
} from "../../actions/users_actions";

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    clearChangeRoleReducer: (state: UsersState) => clearChangeRoleState(state),
  },
  extraReducers: {
    [getUsers.pending.type]: (state: UsersState) => usersLoadingState(state),

    [getUsers.fulfilled.type]: (
      state: UsersState,
      { payload }: PayloadAction<IUser[]>
    ) => usersSuccessState(state, payload),

    [getUsers.rejected.type]: (
      state: UsersState,
      { payload }: PayloadAction<Error>
    ) => usersErrorState(state, payload),

    [getSelectedUser.pending.type]: (state) => selectedUserLoadingState(state),

    [getSelectedUser.fulfilled.type]: (
      state: UsersState,
      { payload }: PayloadAction<IUser>
    ) => selectedUserSuccessState(state, payload),

    [getSelectedUser.rejected.type]: (
      state: UsersState,
      { payload }: PayloadAction<Error>
    ) => selectedUserErrorState(state, payload),

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
  clearChangeRoleReducer,
} = usersSlice.actions;

export const usersSliceReducer = usersSlice.reducer;

export const usersSelector = (store: TStore) => store.users;
