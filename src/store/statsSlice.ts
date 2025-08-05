import { createSlice } from "@reduxjs/toolkit";
import { StatsStorage } from "../types/StatsStorage";

interface StatsState {
    stats: StatsStorage | null;
}

const initialState: StatsState = {
    stats: null,
};

export const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.stats = action.payload;
        },
        addSession: (state, action) => {
            const { category, duration } = action.payload;

            // Acá irías actualizando:
            // - stats.todayFocus
            // - stats.categoryStats.daily
            // - stats.categoryStats.weekly
            // - stats.categoryStats.monthly
            // - etc...
        },
        consolidateStats: (state) => {
            // Lógica de consolidación semanal y mensual
        },
        resetStats: (state) => {
            state.stats = initialState.stats;
        },
    },
});

export const { setStats } = statsSlice.actions;

export default statsSlice.reducer;
