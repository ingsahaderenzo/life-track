import { Stadistics } from "./Stadistics";
import { StatsStorage } from "./StatsStorage";

export const initialStadistics: Stadistics = {
    monthTotal: 0,
    lastMonthTotal: 0,
    dailyAverage: 0,
    bestStreak: 0,
    bestDay: 0,
    maxSessionsPerDay: 0,
    longestSession: 0,
    currentStreak: 0,
    todaySessions: 0,
    targetDuration: 0,
    todayFocus: 0,
};

export const emptyStats: StatsStorage = {
    stadistics: initialStadistics,
    categoryStats: {
        daily: {},
        weekly: {},
        monthly: {},
    },
    compactStats: {
        totalByWeek: {},
        totalByMonth: {},
    },
};
