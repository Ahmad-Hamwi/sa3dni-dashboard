import "reflect-metadata";
import {ThemeProvider, CssBaseline} from "@material-ui/core";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import {store} from "./presentation/redux/store";
import theme from "./presentation/theme/theme";
import App from "./presentation/ui/App";


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);
