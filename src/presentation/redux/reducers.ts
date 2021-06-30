import { loginReducer } from "../ui/auth/login/redux/reducer";
import { registerReducer } from "../ui/auth/register/redux/reducer";

const reducers = {
  login: loginReducer,
  register: registerReducer,
};

export default reducers;
