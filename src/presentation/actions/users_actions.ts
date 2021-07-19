import {
  usersErrorReducer,
  usersSuccessReducer,
  usersLoadingReducer,
  selectedUserLoadingReducer,
  selectedUserSuccessReducer,
  selectedUserErrorReducer,
  changeRoleSuccessReducer,
  changeRoleErrorReducer,
} from "../reducers/users/users_reducer";
import { resolveRepository } from "../../di/injection";
import IUserRepository from "../../domain/gateway/IUserRepository";
import { UserRole } from "../../domain/entity/UserRole";
import IUserRoleRepository from "../../domain/gateway/IUserRoleRepository";
import { IUser } from "../../domain/entity/User";

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

export const changeSelectedUserRole =
  (selectedUser: IUser, selectedUserRole: UserRole) =>
  async (dispatch: any) => {
    const userRoleRepository: IUserRoleRepository =
      resolveRepository.userRole();

    try {
      const result = await userRoleRepository.update(
        selectedUser.id,
        selectedUserRole.toString()
      );
      if (result) {
        const affectedUser = { ...selectedUser, role: selectedUserRole };
        dispatch(changeRoleSuccessReducer(affectedUser));
      }
    } catch (e) {
      const notAffectedUser = { ...selectedUser, role: selectedUserRole };
      dispatch(changeRoleErrorReducer(notAffectedUser));
    }
  };
