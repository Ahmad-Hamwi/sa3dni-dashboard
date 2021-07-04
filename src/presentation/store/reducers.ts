import { loginReducer } from "../pages/auth/login/redux/reducer";
import { registerReducer } from "../pages/auth/register/redux/reducer";

const reducers = {
  login: loginReducer,
  register: registerReducer,
};

export default reducers;
