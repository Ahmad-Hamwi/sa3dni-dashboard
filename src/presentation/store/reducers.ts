import { loginReducer } from "../pages/auth/login/redux/reducer";
import { registerReducer } from "../pages/auth/register/redux/reducer";
import { usersSliceReducer } from "../pages/dashboard/navigation/workspace/agents/redux/reducer";

const reducers = {
  login: loginReducer,
  register: registerReducer,
  users: usersSliceReducer,
};

export default reducers;
