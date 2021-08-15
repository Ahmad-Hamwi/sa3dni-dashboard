import {getDefaultMiddleware} from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

export default customizedMiddleware;