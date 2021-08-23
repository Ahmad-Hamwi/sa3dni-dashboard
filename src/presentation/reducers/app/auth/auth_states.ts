import UserViewModel from "../../../viewmodel/user/UserViewModel";

export interface AuthState {
  isUserAuthenticated?: boolean;
  user?: UserViewModel | null;
  token?: string | null;
}

export const initialState: AuthState = {};

export const authenticatedState = (
  state: AuthState,
  user: UserViewModel,
  token: string,
): AuthState => {
  state.isUserAuthenticated = true;
  state.user = user;
  state.token = token;
  return state;
};

export const unAuthenticatedState = (state: AuthState): AuthState => {
  state.isUserAuthenticated = false;
  state.user = null;
  state.token = null;
  return state;
};
