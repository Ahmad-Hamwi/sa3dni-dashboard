import { loginReducer } from "../reducers/login/login_reducer";
import { registerReducer } from "../reducers/register/register_reducer";
import { usersSliceReducer } from "../reducers/users/users_reducer";
import {authReducer} from "../reducers/app/auth/auth_reducer";
import {invitationsSliceReducer} from "../reducers/invitations/invitations_reducer";
import {groupsSliceReducer} from "../reducers/groups/groups_reducers";
import {joinReducer} from "../reducers/join/join_reducer";

const reducers = {
  auth: authReducer,
  login: loginReducer,
  register: registerReducer,
  join: joinReducer,
  users: usersSliceReducer,
  invitations: invitationsSliceReducer,
  groups: groupsSliceReducer
};

export default reducers;
