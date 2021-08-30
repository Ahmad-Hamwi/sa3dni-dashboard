import {UserPerformanceModel} from "../../../model/report/UserPerformanceModel";

export default interface IUserReportsRepository {

    getTopRatedUsers(filter: UserReportsFilter): Promise<UserPerformanceModel[]>

    getUserPerformance(filter: UserPerformanceFilter): Promise<UserPerformanceModel>
}

export type UserReportsFilter = {
    startDate?: Date;
    endDate?: Date;
};

export type UserPerformanceFilter = UserReportsFilter & {
    userId: string
}

export const INJECT_USER_REPORTS_REPOSITORY = "INJECT_USER_REPORTS_REPOSITORY";