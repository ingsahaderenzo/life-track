// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../store/themeSlice";
import categoriesReducer from "../store/categoriesSlice";
import statsReducer from "../store/statsSlice";
import quickStartReducer from "../store/quickStartSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        categories: categoriesReducer,
        stats: statsReducer,
        quickStart: quickStartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
