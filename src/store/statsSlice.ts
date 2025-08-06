import { createSlice } from "@reduxjs/toolkit";
import { StatsStorage } from "../types/StatsStorage";
import { emptyStats } from "../types/InitialStats";
import {
    getCurrentDateKey,
    getCurrentMonthKey,
    getCurrentWeekKey,
} from "../utils/TimeUtils";
import { saveToStorage } from "../utils/StorageUtils";

interface StatsState {
    stats: StatsStorage;
}

const initialState: StatsState = {
    stats: emptyStats,
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

            console.log();

            const stats = state.stats.stadistics;

            const dateKey = getCurrentDateKey();
            const weekKey = getCurrentWeekKey();
            const monthKey = getCurrentMonthKey();

            // Si es la primera sesión del día, incrementar la racha
            const isFirstSessionToday =
                !state.stats.categoryStats.daily[dateKey];
            if (isFirstSessionToday) {
                stats.currentStreak += 1;
            }

            // Actualizar datos actuales
            stats.todayFocus += duration;
            stats.todaySessions += 1;
            stats.monthTotal += duration;

            // Actualizar máximos
            stats.maxSessionsPerDay = Math.max(
                stats.maxSessionsPerDay,
                stats.todaySessions
            );
            stats.longestSession = Math.max(stats.longestSession, duration);
            stats.bestDay = Math.max(stats.bestDay, stats.todayFocus);
            stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);

            // Actualizar stats por categoría
            const updateCategoryStats = (
                target: Record<string, Record<string, number>>,
                key: string
            ) => {
                if (!target[key]) {
                    target[key] = {};
                }
                if (!target[key][category]) {
                    target[key][category] = 0;
                }
                target[key][category] += duration;
            };

            updateCategoryStats(state.stats.categoryStats.daily, dateKey);
            updateCategoryStats(state.stats.categoryStats.weekly, weekKey);
            updateCategoryStats(state.stats.categoryStats.monthly, monthKey);

            stats.lastSession = dateKey;

            saveToStorage("stats", state.stats);
        },
        consolidateStats: (state) => {
            // Lógica de consolidación semanal y mensual
        },
        resetStats: (state) => {
            state.stats = initialState.stats;
        },
    },
});

export const { setStats, addSession, resetStats } = statsSlice.actions;

export default statsSlice.reducer;
