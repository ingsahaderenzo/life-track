import { StatusBar } from "expo-status-bar";
import StackNavigator from "./src/navigation/StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { PaperProvider } from "react-native-paper";
import theme from "./src/theme/theme";

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <StatusBar style="auto" />
                <StackNavigator />
            </PaperProvider>
        </SafeAreaProvider>
    );
}
