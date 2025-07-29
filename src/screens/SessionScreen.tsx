import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import SessionHeader from "../components/session/SessionHeader";
import { useState } from "react";

export default function SessionScreen() {
    // Use a hook to bring back the theme
    const theme = useTheme();

    // Hook to know what kind of mode we got
    const [mode, setMode] = useState<"Temporizador" | "Cronometro">(
        "Temporizador"
    );

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.surface },
            ]}
        >
            <SessionHeader mode={mode} setMode={setMode} />
            <View
                style={[
                    styles.body,
                    { backgroundColor: theme.colors.background },
                ]}
            >
                <Text>{mode}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        maxWidth: 500,
        padding: 20,
    },
});
