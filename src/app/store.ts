// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../store/themeSlice";
import categoriesReducer from "../store/categoriesSlice";
import statsReducer from "../store/statsSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        categories: categoriesReducer,
        stats: statsReducer,
    },
});
