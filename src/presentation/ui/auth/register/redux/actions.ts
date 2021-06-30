import { setLoading, setRegisterFailed, setRegisterSuccess } from "./reducer";

export type RegisterParams = {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
};

export const register = (params: RegisterParams) => async (dispatch: any) => {
  dispatch(setLoading(true));

  try {
    dispatch(setRegisterSuccess());
  } catch (e) {
    dispatch(setRegisterFailed(e));
  }
};
