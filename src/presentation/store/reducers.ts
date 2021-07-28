import { loginReducer } from "../reducers/login/login_reducer";
import { registerReducer } from "../reducers/register/register_reducer";
import { usersSliceReducer } from "../reducers/users/users_reducer";
import {authReducer} from "../reducers/app/auth/auth_reducer";
import {invitationsSliceReducer} from "../reducers/invitations/invitations_reducer";
import {groupsSliceReducer} from "../reducers/groups/groups_reducers";

const reducers = {
  auth: authReducer,
  login: loginReducer,
  register: registerReducer,
  users: usersSliceReducer,
  invitations: invitationsSliceReducer,
  groups: groupsSliceReducer
};

export default reducers;
