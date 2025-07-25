import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import TabNavigator from "./src/navigation/TabNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { useAppTheme } from "./src/hooks/useAppTheme";

function ThemeProvider() {
    const currentTheme = useAppTheme();

    return (
        <SafeAreaProvider>
            <PaperProvider theme={currentTheme}>
                <StatusBar style="auto" />
                <TabNavigator />
            </PaperProvider>
        </SafeAreaProvider>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider />
        </Provider>
    );
}
