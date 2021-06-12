import ProductSansRegularWoff from "./ProductSans-Regular.woff";
import ProductSansThinRegularWoff from "./ProductSans-Thin.woff";
import ProductSansLightRegularWoff from "./ProductSans-Light.woff";
import ProductSansMediumRegularWoff from "./ProductSans-Medium.woff";
import ProductSansBoldRegularWoff from "./ProductSans-Bold.woff";
import ProductSansBlackRegularWoff from "./ProductSans-Black.woff";

namespace FontProps {
  export const ProductSansThinRegularProps = {
    fontFamily: "ProductSans",
    fontStyle: "normal",
    fontWeight: 100,
    src: `local('Product Sans Thin Regular'), url(${ProductSansThinRegularWoff}) format('woff')`,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  };

  export const ProductSansLightRegularProps = {
    fontFamily: "ProductSans",
    fontStyle: "normal",
    fontWeight: 300,
    src: `local('Product Sans Thin Regular'), url(${ProductSansLightRegularWoff}) format('woff')`,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  };

  export const ProductSansRegularProps = {
    fontFamily: "ProductSans",
    fontStyle: "normal",
    fontWeight: 400,
    src: `local('Product Sans Regular'), url(${ProductSansRegularWoff}) format('woff')`,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  };

  export const ProductSansMediumRegularProps = {
    fontFamily: "ProductSans",
    fontStyle: "normal",
    fontWeight: 500,
    src: `local('Product Sans Medium Regular'), url(${ProductSansMediumRegularWoff}) format('woff')`,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  };

  export const ProductSansBoldRegularProps = {
    fontFamily: "ProductSans",
    fontStyle: "italic",
    fontWeight: 700,
    src: `local('Product Sans Bold Regular'), url(${ProductSansBoldRegularWoff}) format('woff')`,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  };

  export const ProductSansBlackRegularProps = {
    fontFamily: "ProductSans",
    fontStyle: "normal",
    fontWeight: 900,
    src: `local('Product Sans Black Regular'), url(${ProductSansBlackRegularWoff}) format('woff')`,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  };
}

export default FontProps;
