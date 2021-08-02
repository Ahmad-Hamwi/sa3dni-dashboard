import { setLoading, setRegisterFailed, setRegisterSuccess } from "../reducers/register/register_reducer";
import RegisterUseCase from "../../domain/interactor/auth/RegisterUseCase";
import { resolve } from "../../di/injection";

export type RegisterParams = {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
};

export const register = (params: RegisterParams) => async (dispatch: any) => {
  dispatch(setLoading(true));

  const registerUseCase = resolve<RegisterUseCase>(RegisterUseCase);

  try {
    const { success } = await registerUseCase.execute(params);

    dispatch(setRegisterSuccess());
  } catch (e) {
    dispatch(setRegisterFailed(e));
  }
};
