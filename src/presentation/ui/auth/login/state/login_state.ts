export interface LoginState {
    isAuth: boolean;
    // result?: LoginResult;
    isLoading: boolean;
    error?: string;
    isSuccess: boolean;
}

export const initialState: LoginState = {
    isAuth: false,
    isLoading: false,
    isSuccess: false,
};
