import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import SessionHeader from "../components/session/SessionHeader";
import { useState } from "react";
import CategoryList from "../components/session/CategoryList";
import ParametersList from "../components/session/ParametersList";
import ButtonsSession from "../components/session/ButtonsSession";
import TimerModal from "../components/session/TimerModal";

export default function SessionScreen() {
    // Use a hook to bring back the theme
    const theme = useTheme();

    const [startEnabled, setStartEnabled] = useState<boolean>(false);
    const [resetInputs, setResetInputs] = useState<boolean>(false);
    const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);
    const [duration, setDuration] = useState<string>("");
    const [sessions, setSessions] = useState<string>("");
    const [breakDuration, setBreakDuration] = useState<string>("");

    // Hook to know what kind of mode we got
    const [mode, setMode] = useState<"Temporizador" | "Cronometro">(
        "Temporizador"
    );

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <SessionHeader mode={mode} setMode={setMode} />
            <View
                style={[
                    styles.body,
                    {
                        backgroundColor: theme.colors.secondaryContainer,
                    },
                ]}
            >
                <Text variant="headlineSmall">
                    {mode === "Cronometro" ? "Sesión libre" : "Nueva sesión"}
                </Text>
                <CategoryList />
                <ParametersList
                    mode={mode}
                    setStartEnabled={setStartEnabled}
                    resetInputs={resetInputs}
                    setDuration={setDuration}
                    setSessions={setSessions}
                    setBreakDuration={setBreakDuration}
                    duration={duration}
                    sessions={sessions}
                    breakDuration={breakDuration}
                />
                <ButtonsSession
                    startEnabled={startEnabled}
                    setResetInputs={setResetInputs}
                    resetInputs={resetInputs}
                    mode={mode}
                    startTimer={() => setTimeModalVisible(true)}
                />
                <TimerModal
                    visible={timeModalVisible}
                    forceClose={() => setTimeModalVisible(false)}
                    okClose={() => setTimeModalVisible(false)}
                    duration={parseInt(duration)}
                    sessions={parseInt(sessions)}
                    breakDuration={parseInt(breakDuration)}
                    mode={mode}
                />
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
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
    },
});
