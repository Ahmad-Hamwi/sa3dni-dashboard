import {dataErrorActionReducer, dataSuccessActionReducer, loadingActionReducer} from "./reducer";
import GetUsersUseCase from "../../../../../../../domain/interactor/user/GetUsersUseCase";
import {resolve} from "../../../../../../../di/injection";

export const getUsers = () => async (dispatch: any) => {
    dispatch(loadingActionReducer());

    const getUsersUseCase = resolve<GetUsersUseCase>(GetUsersUseCase);

    try {
        var result = await getUsersUseCase.execute()
        dispatch(dataSuccessActionReducer(result));
    } catch (e) {
        dispatch(dataErrorActionReducer(e));
    }
}