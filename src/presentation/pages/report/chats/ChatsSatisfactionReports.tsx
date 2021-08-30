import { FC, useEffect, useState } from "react";
import DaysFilter, {
  FilterValue,
} from "../../../components/reports/DaysFilter";
import ChatsSatisfactionRatePie from "../../../components/reports/chats/satisfaction/ChatsSatisfactionRatePie";
import ChatSatisfactionRateBar from "../../../components/reports/chats/satisfaction/ChatSatisfactionRateBar";
import ChatSatisfactionRateTable from "../../../components/reports/chats/satisfaction/ChatSatisfactionRateTable";
import { useDispatch, useSelector } from "react-redux";
import { chatSatisfactionsSelector } from "../../../reducers/reports/chat/satisfactions/chat_satisfactions_reducer";
import { getChatsSatisfactions } from "../../../actions/reports_actions";

const ChatsSatisfactionReports: FC = () => {
  const { satisfactions, isLoading } = useSelector(chatSatisfactionsSelector);

  const [daysFilter, setDaysFilter] = useState<FilterValue>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getChatsSatisfactions({
        startDate: daysFilter?.start,
        endDate: daysFilter?.end,
      })
    );
  }, [daysFilter, dispatch]);

  const handleDaysFilter = (filter: FilterValue) => {
    setDaysFilter(filter);
  };

  return (
    <div>
      <DaysFilter onSelect={handleDaysFilter} />

      <div style={{ width: "300px", margin: "0 auto" }}>
        <ChatsSatisfactionRatePie
          data={{
            totalChats: satisfactions?.totalChats || 0,
            ratedGoodChats: satisfactions?.ratedGood || 0,
            ratedBadChats: satisfactions?.ratedBad || 0,
          }}
        />
      </div>

      <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatSatisfactionRateBar data={satisfactions?.days || []} />
      </div>

      <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatSatisfactionRateTable data={satisfactions?.days || []} />
      </div>
    </div>
  );
};

export default ChatsSatisfactionReports;
