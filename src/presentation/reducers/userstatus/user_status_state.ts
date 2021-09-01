export default interface UserStatusState {
  isChangingState: boolean;
  userStatusSuccess?: string | null;
  userStatusError?: string;
}

export const initialUserStatusState: UserStatusState = {
  isChangingState: false,
};
