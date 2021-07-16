import {
  usersErrorReducer,
  usersSuccessReducer,
  usersLoadingReducer,
  selectedUserLoadingReducer,
  selectedUserSuccessReducer,
  selectedUserErrorReducer,
} from "../reducers/users/users_reducer";
import { resolveRepository } from "../../di/injection";
import IUserRepository from "../../domain/gateway/IUserRepository";

export const getUsers = () => async (dispatch: any) => {
  dispatch(usersLoadingReducer());

  const userRepository: IUserRepository = resolveRepository.users();

  try {
    const users = await userRepository.getAll();
    dispatch(usersSuccessReducer(users));
  } catch (e) {
    dispatch(usersErrorReducer(e));
  }
};

export const getSelectedUser =
  (selectedUserId: string) => async (dispatch: any) => {
    dispatch(selectedUserLoadingReducer());

    const userRepository: IUserRepository = resolveRepository.users();

    try {
      const selectedUser = await userRepository.get(selectedUserId);
      dispatch(selectedUserSuccessReducer(selectedUser));
    } catch (e) {
      dispatch(selectedUserErrorReducer(e));
    }
  };