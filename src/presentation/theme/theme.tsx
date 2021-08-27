import { createMuiTheme } from "@material-ui/core";
import FontProps from "./fonts/productSansFontProps";

/**
 * A simple theme provided by the material ui library.
 * ProductSans font has been configured in this theme.
 *
 * Note that multiple themes can be created and provided to the app.
 * For example: Dark Theme and Light Theme, each with their respective values.
 */

const theme = createMuiTheme({
  typography: {
    fontFamily: "ProductSans",
    button: {
      textTransform: "none",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          FontProps.ProductSansThinRegularProps,
          FontProps.ProductSansLightRegularProps,
          FontProps.ProductSansRegularProps,
          FontProps.ProductSansMediumRegularProps,
          FontProps.ProductSansBoldRegularProps,
          FontProps.ProductSansBlackRegularProps,
        ],
      },
    },

    MuiRadio: {
      root: {
        color: "#6200ea",
      },
      colorSecondary: {
        '&$checked': {
          color: "#6200ea",
        },
      },
    },

    MuiTouchRipple: {
      child: {
        backgroundColor: "#757ce8",
      },
    },
  },
  palette: {
    primary: {
      light: "#9d46ff",
      main: "#6200ea",
      dark: "#0a00b6",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffffff",
      main: "#ece0fd",
      dark: "#baaeca",
      contrastText: "#000000",
    },
  },
});

export default theme;
