import { IUser } from "../../../../domain/entity/User";

export interface AuthState {
  isUserAuthenticated?: boolean;
  user?: IUser | null;
}

export const initialState: AuthState = {};

export const authenticatedState = (
  state: AuthState,
  user: IUser
): AuthState => {
  state.isUserAuthenticated = true;
  state.user = user;
  return state;
};

export const unAuthenticatedState = (state: AuthState): AuthState => {
  state.isUserAuthenticated = false;
  state.user = null;
  return state;
};
