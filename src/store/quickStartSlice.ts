import { createSlice } from "@reduxjs/toolkit";
import { QuickStartData } from "../types/QuickStartData";

interface QuickStartState {
    quickStarts: QuickStartData[];
}

const initialState: QuickStartState = {
    quickStarts: [],
};

export const quickStartSlice = createSlice({
    name: "quickStart",
    initialState,
    reducers: {
        setQuickStart: (state, action) => {
            state.quickStarts = action.payload;
        },
    },
});

export const { setQuickStart } = quickStartSlice.actions;

export default quickStartSlice.reducer;
