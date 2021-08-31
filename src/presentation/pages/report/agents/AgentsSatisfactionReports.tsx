import { FC, useEffect, useState } from "react";
import DaysFilter, {
  FilterValue,
} from "../../../components/reports/DaysFilter";
import TopRatedAgentsTable from "../../../components/reports/agents/TopRatedAgentsTable";
import { Typography } from "@material-ui/core";
import AgentsFilter from "../../../components/reports/agents/AgentsFilter";
import AgentPerformance from "../../../components/reports/agents/AgentPerformance";
import { useDispatch, useSelector } from "react-redux";
import { userReportsSelector } from "../../../reducers/reports/user/user_reports_reducer";
import {
  getTopRatedUsers,
  getUserPerformance,
} from "../../../actions/reports_actions";
import { getUsers } from "../../../actions/users_actions";
import { usersSelector } from "../../../reducers/users/users_reducer";
import UserViewModel from "../../../viewmodel/user/UserViewModel";

const AgentsSatisfactionReports: FC = (props) => {
  const { topRatedUsers, selectedUserPerformance } =
    useSelector(userReportsSelector);

  const { users } = useSelector(usersSelector);

  const [daysFilter, setDaysFilter] = useState<FilterValue>();

  const [selectedUser, setSelectedUser] = useState<UserViewModel>();

  const dispatch = useDispatch();

  const handleDaysFilter = (filter: FilterValue) => {
    setDaysFilter(filter);
  };

  const handleUserSelect = (user: UserViewModel) => {
      console.log("User", user)
    setSelectedUser(user);
  };

  useEffect(() => {
    dispatch(
      getTopRatedUsers({
        startDate: daysFilter?.start,
        endDate: daysFilter?.end,
      })
    );
  }, [daysFilter, dispatch]);

  useEffect(() => {
    if (selectedUser)
      dispatch(
        getUserPerformance({
          userId: selectedUser.id,
          startDate: daysFilter?.start,
          endDate: daysFilter?.end,
        })
      );
  }, [daysFilter, selectedUser, dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <DaysFilter onSelect={handleDaysFilter} />

      <div style={{ width: "90%", margin: "16px auto" }}>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Top Rated Agents
        </Typography>
        <TopRatedAgentsTable data={topRatedUsers || []} />
      </div>

      <div style={{ width: "90%", margin: "32px auto" }}>
        <Typography variant="h5" style={{ marginBottom: "16px" }}>
          Agent Performance
        </Typography>

        <AgentsFilter data={users || []} onSelect={handleUserSelect} />

        {selectedUserPerformance && (
          <div style={{ marginTop: "16px" }}>
            <AgentPerformance data={selectedUserPerformance} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsSatisfactionReports;
