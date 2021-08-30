import {UserPerformanceModel} from "../../../../infrastructure/model/report/UserPerformanceModel";

export interface UserReportsState {
    isLoading: boolean,
    topRatedUsers?: UserPerformanceModel[]

    selectedUserPerformance?: UserPerformanceModel
}

export const userReportsInitialState: UserReportsState = {
    isLoading: false,
}