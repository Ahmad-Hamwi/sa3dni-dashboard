import {setAuthFailed, setAuthSuccess, setLoading} from "./login_reducer";
import {resolve} from "../../../../../di/injection";
import LoginUseCase from "../../../../../domain/interactor/auth/LoginUseCase";

export const login = (email: string, password: string) => async (dispatch: any) => {

    dispatch(setLoading(true));

    const useCase = resolve<LoginUseCase>(LoginUseCase);

    useCase.execute(
        {email, password}
    ).then(result => {
        setAuthSuccess();
    }).catch(e => {
        console.log(e)
        dispatch(setAuthFailed(e.message));
    });

};
