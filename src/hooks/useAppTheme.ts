// src/hooks/useAppTheme.ts
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { theme } from "../theme/theme";
import { getFromStorage } from "../utils/StorageUtils";
import { setThemePreference } from "../store/themeSlice";
import { store } from "../app/store";

export function useAppTheme() {
    const colorScheme = useColorScheme();
    const themePreference = useSelector(
        (state: any) => state.theme.themePreference
    );
    const [currentTheme, setCurrentTheme] = useState(() => {
        if (themePreference === "light") return theme.light;
        if (themePreference === "dark") return theme.dark;
        return colorScheme === "dark" ? theme.dark : theme.light;
    });

    useEffect(() => {
        const fetchStored = async () => {
            const stored = await getFromStorage<string>("themePreference");
            if (stored) store.dispatch(setThemePreference(stored));
        };
        fetchStored();
    }, []);

    useEffect(() => {
        if (themePreference === "light") setCurrentTheme(theme.light);
        else if (themePreference === "dark") setCurrentTheme(theme.dark);
        else setCurrentTheme(colorScheme === "dark" ? theme.dark : theme.light);
    }, [themePreference, colorScheme]);

    return currentTheme;
}
