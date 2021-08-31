export interface ChatSatisfactionsModel {
    totalChats: number,
    ratedGood: number,
    ratedBad: number,
    days: ChatSatisfactionDayModel[]
}

export interface ChatSatisfactionDayModel {
    date: string
    ratedGood: number,
    ratedBad: number
}