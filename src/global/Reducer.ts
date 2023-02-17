import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { BlogAPI } from "./BlogAPI";

export const Reducer = configureStore({
    reducer: {
        [BlogAPI.reducerPath]: BlogAPI.reducer,
    },
    // gDM = getDefaultMiddleware
    middleware: (gDM) => gDM().concat(BlogAPI.middleware),
});

setupListeners(Reducer.dispatch);
export type RootState = ReturnType<typeof Reducer.getState>;
export type AppDispatch = typeof Reducer.dispatch;



