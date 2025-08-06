import { CategoryStats } from "./CategoryStats";
import { Stadistics } from "./Stadistics";

export interface StatsStorage {
    stadistics: Stadistics;

    categoryStats: {
        daily: CategoryStats; // Día por categoría (solo la semana actual)
        weekly: CategoryStats; // Semana por categoría (solo actual y anterior)
        monthly: CategoryStats; // Mes por categoría (actual y anterior o más)
    };
}
