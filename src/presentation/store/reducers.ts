import { loginReducer } from "../pages/auth/login/redux/reducer";
import { registerReducer } from "../pages/auth/register/redux/reducer";
import { usersSliceReducer } from "../pages/dashboard/navigation/workspace/agents/redux/reducer";
import {authReducer} from "../app/redux/auth/reducer";

const reducers = {
  auth: authReducer,
  login: loginReducer,
  register: registerReducer,
  users: usersSliceReducer,
};

export default reducers;
