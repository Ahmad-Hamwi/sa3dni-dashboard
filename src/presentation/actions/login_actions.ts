import { setLoading, setLoginSuccess, setLoginFailed } from "../reducers/login/login_reducer";
import { resolve } from "../../di/injection";
import LoginUseCase from "../../domain/interactor/auth/LoginUseCase";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(setLoading(true));

    const useCase = resolve<LoginUseCase>(LoginUseCase);

    try {
      const result = await useCase.execute({ email, password });
      dispatch(setLoginSuccess());
    } catch (e) {
      dispatch(setLoginFailed(e));
    }
  };
