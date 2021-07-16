import "reflect-metadata";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { store } from "./presentation/store/store";
import theme from "./presentation/theme/theme";
import App from "./presentation/app/App";
import {inject} from "./di/injection";

inject();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
