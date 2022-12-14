import { loginReducer } from "../reducers/login/login_reducer";
import { registerReducer } from "../reducers/register/register_reducer";
import { usersSliceReducer } from "../reducers/users/users_reducer";
import { authReducer } from "../reducers/app/auth/auth_reducer";
import { invitationsSliceReducer } from "../reducers/invitations/invitations_reducer";
import { groupsSliceReducer } from "../reducers/groups/groups_reducers";
import { joinReducer } from "../reducers/join/join_reducer";
import { combineReducers } from "redux";
import { dashboardSocketReducer } from "../reducers/connection/dashboard/dashboard_socket_reducer";
import { chatReducer } from "../reducers/chat/list/chats_reducer";
import { openedChatReducer } from "../reducers/chat/opened/opened_chat_reducer";
import { messagesReducer } from "../reducers/chat/messages/messages_reducer";
import { chatSatisfactionsReducer } from "../reducers/reports/chat/satisfactions/chat_satisfactions_reducer";
import { chatAvailabilitiesReducer } from "../reducers/reports/chat/availabilities/chat_availabilities_reducer";
import { companyReducer } from "../reducers/company/company_reducer";
import { userReportsSliceReducer } from "../reducers/reports/user/user_reports_reducer";
import { userStatusReducer } from "../reducers/userstatus/user_status_reducer";

const reducers = {
  auth: authReducer,
  login: loginReducer,
  register: registerReducer,
  join: joinReducer,
  dashboardSocket: dashboardSocketReducer,
  users: usersSliceReducer,
  invitations: invitationsSliceReducer,
  groups: groupsSliceReducer,
  chat: chatReducer,
  openedChat: openedChatReducer,
  messages: messagesReducer,
  company: companyReducer,
  chatSatisfactions: chatSatisfactionsReducer,
  chatAvailabilities: chatAvailabilitiesReducer,
  userReports: userReportsSliceReducer,
  userStatus: userStatusReducer,
};

const combinedReducers = combineReducers(reducers);

export default combinedReducers;
