import { FC, useEffect, useState } from "react";
import DaysFilter, {
  FilterValue,
} from "../../../components/reports/DaysFilter";
import ChatAvailabilityBar from "../../../components/reports/chats/availability/ChatAvailabilityBar";
import ChatAvailabilityTable from "../../../components/reports/chats/availability/ChatAvailabilityTable";
import { useDispatch, useSelector } from "react-redux";
import { chatAvailabilitiesSelector } from "../../../reducers/reports/chat/availabilities/chat_availabilities_reducer";
import {getChatsAvailabilities, getChatsSatisfactions} from "../../../actions/reports_actions";

const ChatsAvailabilityReports: FC = (props) => {
  const { availabilities } = useSelector(chatAvailabilitiesSelector);

  const [daysFilter, setDaysFilter] = useState<FilterValue>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getChatsAvailabilities({
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
      <DaysFilter onSelect={handleDaysFilter}/>

      <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatAvailabilityBar data={availabilities?.days || []} />
      </div>

      <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatAvailabilityTable data={availabilities?.days || []} />
      </div>
    </div>
  );
};

export default ChatsAvailabilityReports;
