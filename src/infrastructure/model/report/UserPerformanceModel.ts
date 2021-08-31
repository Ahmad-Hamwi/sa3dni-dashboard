import UserModel from "../UserModel";

export interface UserPerformanceModel {
    user: UserModel
    totalChats: number,
    ratedGood: number,
    ratedBad: number,
    ratedGoodPercent: number,
    averageResponseTime?: number
}