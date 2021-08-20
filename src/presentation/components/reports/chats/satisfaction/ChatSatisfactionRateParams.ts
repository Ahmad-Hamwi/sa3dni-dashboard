export type RateTotals = {
  totalChats: number;
  ratedGoodChats: number;
  ratedBadChats: number;
};

export type DayRateSatisfaction = {
  date: string;
  ratedGoodChats: number;
  ratedBadChats: number;
}