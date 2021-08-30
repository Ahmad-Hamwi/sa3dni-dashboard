import UserViewModel from "./UserViewModel";

export default interface UserPerformanceViewModel {
    user: UserViewModel
    totalChats: number
    ratedGood: number
    ratedBad: number
    ratedGoodPercent: number,
    averageResponseTime?: number
}