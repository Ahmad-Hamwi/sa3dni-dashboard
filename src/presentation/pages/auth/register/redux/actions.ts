import { setLoading, setRegisterFailed, setRegisterSuccess } from "./reducer";
import RegisterUseCase from "../../../../../domain/interactor/auth/RegisterUseCase";
import { resolve } from "../../../../../di/injection";

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
    const { success } = await registerUseCase.execute({
      email: params.email,
      password: params.password,
      fullName: params.fullName,
      phoneNumber: params.phoneNumber,
      companyName: params.companyName,
    });

    dispatch(setRegisterSuccess());
  } catch (e) {
    dispatch(setRegisterFailed(e));
  }
};
