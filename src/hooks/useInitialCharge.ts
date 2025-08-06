import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFromStorage, saveToStorage } from "../utils/StorageUtils";
import { setCategories } from "../store/categoriesSlice";
import { StatsStorage } from "../types/StatsStorage";
import { setStats } from "../store/statsSlice";
import { emptyStats } from "../types/InitialStats";
import { getCurrentDateKey, getYesterdayDateKey } from "../utils/TimeUtils";

export function useInitialCharge() {
    const dispatch = useDispatch();

    useEffect(() => {
        const initialLoad = async () => {
            try {
                const categories = await getFromStorage<string[]>("categories");
                const stats = await getFromStorage<StatsStorage>("stats");

                if (categories) {
                    dispatch(setCategories(categories));
                } else {
                    dispatch(setCategories([]));
                    saveToStorage("categories", []);
                }

                if (stats) {
                    const todayKey = getCurrentDateKey();
                    const yesterdayKey = getYesterdayDateKey();

                    // Si la última sesión no fue ayer ni hoy, se rompió la racha
                    if (
                        stats.stadistics.lastSession !== todayKey &&
                        stats.stadistics.lastSession !== yesterdayKey
                    ) {
                        stats.stadistics.currentStreak = 0;
                    }

                    dispatch(setStats(stats));
                } else {
                    dispatch(setStats(emptyStats));
                    await saveToStorage("stats", emptyStats);
                }
            } catch (e) {
                console.error("Error cargando datos iniciales:", e);

                // Fallback de emergencia
                dispatch(setCategories([]));
                dispatch(setStats(emptyStats));

                await saveToStorage("categories", []);
                await saveToStorage("stats", emptyStats);
            }
        };

        initialLoad();
    }, []);
}
