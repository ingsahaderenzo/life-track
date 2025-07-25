// src/features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themePreference: "system", // Initial value can be 'light', 'dark', or 'system'
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemePreference: (state, action) => {
            state.themePreference = action.payload;
        },
    },
});

export const { setThemePreference } = themeSlice.actions;

export default themeSlice.reducer;
