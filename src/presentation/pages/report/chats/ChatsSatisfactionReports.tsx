import { FC, useState } from "react";
import DaysFilter from "../../../components/reports/DaysFilter";
import ChatsSatisfactionRatePie from "../../../components/reports/chats/satisfaction/ChatsSatisfactionRatePie";
import ChatSatisfactionRateBar from "../../../components/reports/chats/satisfaction/ChatSatisfactionRateBar";
import ChatSatisfactionRateTable from "../../../components/reports/chats/satisfaction/ChatSatisfactionRateTable";

const ChatsSatisfactionReports: FC = () => {
  const [daysSatisfaction, setDaysSatisfaction] = useState([
    {
      date: "10 Aug",
      ratedGoodChats: 10,
      ratedBadChats: 0,
    },
    {
      date: "11 Aug",
      ratedGoodChats: 1,
      ratedBadChats: 3,
    },
    {
      date: "12 Aug",
      ratedGoodChats: 2,
      ratedBadChats: 2,
    },
  ]);

  return (
    <div>
      <DaysFilter />

      <div style={{width: '300px', margin: '0 auto'}}>
        <ChatsSatisfactionRatePie
          data={{ totalChats: 10, ratedGoodChats: 6, ratedBadChats: 4 }}
        />
      </div>

      <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatSatisfactionRateBar data={daysSatisfaction} />
      </div>

        <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatSatisfactionRateTable data={daysSatisfaction} />
      </div>
    </div>
  );
};

export default ChatsSatisfactionReports;
