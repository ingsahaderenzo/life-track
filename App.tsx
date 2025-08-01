import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { PaperProvider } from "react-native-paper";
import TabNavigator from "./src/navigation/TabNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { useAppTheme } from "./src/hooks/useAppTheme";
import * as Notifications from "expo-notifications";

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

// Configuración global de notificaciones (mover a App.tsx)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider />
        </Provider>
    );
}
