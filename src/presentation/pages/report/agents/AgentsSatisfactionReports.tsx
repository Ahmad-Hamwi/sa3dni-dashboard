import { FC, useState } from "react";
import DaysFilter from "../../../components/reports/DaysFilter";
import TopRatedAgentsTable from "../../../components/reports/agents/TopRatedAgentsTable";
import { Typography } from "@material-ui/core";
import AgentsFilter from "../../../components/reports/agents/AgentsFilter";
import {
  AgentPerformanceInfo
} from "../../../components/reports/agents/AgentSatisfactionParams";
import Utils from "../../../../utils/Utils";
import AgentPerformance from "../../../components/reports/agents/AgentPerformance";

const AgentsSatisfactionReports: FC = (props) => {
  const [agentsSatisfaction, setAgentsSatisfaction] = useState([
    {
      agent: {
        id: "1",
        fullName: "Abdulrahman",
        email: "abdulrahmantayara@company.com",
      },
      totalRatedChats: 10,
      ratedGoodChats: 6,
      ratedBadChats: 4,
    },
    {
      agent: {
        id: "2",
        fullName: "Mouaz",
        email: "mouazalkassem@company.com",
      },
      totalRatedChats: 10,
      ratedGoodChats: 3,
      ratedBadChats: 7,
    },
  ]);

  const [agents, setAgents] = useState([
    {
      id: "1",
      fullName: "Abdulrahman",
      email: "abdulrahmantayara@company.com"
    },
    {
      id: "2",
      fullName: "Mouaz",
      email: "mouazalkassem@company.com"
    }
  ])

  const selectedAgent: AgentPerformanceInfo  = {
    totalRatedChats: 10,
    ratedGoodChats: 6,
    ratedBadChats: 4,
    averageResponseTime: Utils.convertMillisecondsToPeriod(2000)
  }

  return (
    <div>
      <DaysFilter />

      <div style={{ width: "90%", margin: "16px auto" }}>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Top Rated Agents
        </Typography>
        <TopRatedAgentsTable data={agentsSatisfaction} />
      </div>

      <div style={{ width: "90%", margin: "32px auto" }}>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Agent Performance
        </Typography>

        <AgentsFilter data={agents} />
        <div style={{marginTop: '16px'}}>
          <AgentPerformance data={selectedAgent} />
        </div>
      </div>
    </div>
  );
};

export default AgentsSatisfactionReports;
