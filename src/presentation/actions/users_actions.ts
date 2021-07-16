import {
  dataErrorActionReducer,
  dataSuccessActionReducer,
  loadingActionReducer,
} from "../reducers/users/users_reducer";
import { resolveRepository } from "../../di/injection";
import IUserRepository from "../../domain/gateway/IUserRepository";

export const getUsers = () => async (dispatch: any) => {
  dispatch(loadingActionReducer());

  const userRepository: IUserRepository = resolveRepository.users();

  try {
    const users = await userRepository.getAll();
    dispatch(dataSuccessActionReducer(users));
  } catch (e) {
    dispatch(dataErrorActionReducer(e));
  }
};