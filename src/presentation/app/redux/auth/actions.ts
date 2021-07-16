import { resolve } from "../../../../di/injection";
import GetUserDetailsUseCase from "../../../../domain/interactor/user/GetUserDetailsUseCase";
import { authenticated, unAuthenticated } from "./reducer";

export const authenticateUser = () => async (dispatch: any) => {
  const getUserDetailsUseCase = resolve<GetUserDetailsUseCase>(
    GetUserDetailsUseCase
  );

  try {
    const result = await getUserDetailsUseCase.execute({});
    if (result.user) {
      //user token is cached, and used to request the user details.
      dispatch(authenticated(result));
    } else {
      //user token is not cached, the use case fails to deliver a user.
      dispatch(unAuthenticated());
    }
  } catch (e) {
    dispatch(unAuthenticated());
  }
};
