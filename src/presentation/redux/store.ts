import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import reducers from "./reducers";


const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})


export const store = configureStore({reducer: reducers, middleware: customizedMiddleware});
export type TStore = ReturnType<typeof store.getState>;
