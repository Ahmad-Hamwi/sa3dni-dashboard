export type AgentSatisfaction = {
  agent: AgentInfo;
  totalRatedChats: number;
  ratedGoodChats: number;
  ratedBadChats: number;
};

export type AgentInfo = {
  id: string;
  fullName: string;
  email: string;
};

export type AgentPerformanceInfo = {
  totalRatedChats: number;
  ratedGoodChats: number;
  ratedBadChats: number;
  averageResponseTime: string;
};
