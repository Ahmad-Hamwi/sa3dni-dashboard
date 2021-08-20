import UserViewModel from "../../../viewmodel/user/UserViewModel";

export interface AuthState {
  isUserAuthenticated?: boolean;
  user?: UserViewModel | null;
}

export const initialState: AuthState = {};

export const authenticatedState = (
  state: AuthState,
  user: UserViewModel
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
