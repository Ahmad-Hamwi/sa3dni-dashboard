import { FC, useState } from "react";
import DaysFilter from "../../../components/reports/DaysFilter";
import ChatAvailabilityBar from "../../../components/reports/chats/availability/ChatAvailabilityBar";
import ChatAvailabilityTable from "../../../components/reports/chats/availability/ChatAvailabilityTable";

const ChatsAvailabilityReports: FC = (props) => {
  const [daysAvailability, setDaysAvailability] = useState([
    {
      availability: 12321312,
      date: "10 Aug",
    },
    {
      availability: 22321312,
      date: "11 Aug",
    },
    {
      availability: 32321312,
      date: "12 Aug",
    },
  ]);

  return (
    <div>
      <DaysFilter />

      <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatAvailabilityBar data={daysAvailability} />
      </div>

      <div style={{ width: "90%", margin: "16px auto" }}>
        <ChatAvailabilityTable data={daysAvailability} />
      </div>
    </div>
  );
};

export default ChatsAvailabilityReports;
