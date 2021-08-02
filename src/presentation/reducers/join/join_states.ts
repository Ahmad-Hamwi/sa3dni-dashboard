export interface JoinState {
    isLoading: boolean;
    error?: Error | null;
    success?: boolean | null;
}

export const joinInitialState: JoinState = {
    isLoading: false,
    error: null,
    success: null
}
