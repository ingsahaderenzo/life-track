import { View } from "react-native";
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
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                width: "100%",
                height: "100%",
            }}
        >
            <SessionHeader mode={mode} setMode={setMode} />
        </View>
    );
}
