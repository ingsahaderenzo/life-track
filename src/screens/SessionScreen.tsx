import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import SessionHeader from "../components/session/SessionHeader";
import { useEffect, useState } from "react";
import CategoryList from "../components/session/CategoryList";
import ParametersList from "../components/session/ParametersList";
import ButtonsSession from "../components/session/ButtonsSession";
import TimerModal from "../components/session/TimerModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addSession } from "../store/statsSlice";
import MessageModal from "../components/common/MessageModal";

export default function SessionScreen() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [startEnabled, setStartEnabled] = useState<boolean>(false);
    const [resetInputs, setResetInputs] = useState<boolean>(false);
    const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);
    const [duration, setDuration] = useState<string>("");
    const [sessions, setSessions] = useState<string>("");
    const [breakDuration, setBreakDuration] = useState<string>("");
    const [selectedCategorie, setSelectedCategoria] = useState<string>("");
    const [messageModalVisible, setMessageModalVisble] =
        useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    // Take the categories from redux
    const categories = useSelector(
        (store: RootState) => store.categories.categories
    );

    // Hook to know what kind of mode we got
    const [mode, setMode] = useState<"Temporizador" | "Cronometro">(
        "Temporizador"
    );

    // Verify inputs and enable/disable start button
    useEffect(() => {
        const enableButtons = () => {
            if (mode === "Temporizador") {
                if (parseInt(sessions) > 1) {
                    setStartEnabled(
                        duration !== "" &&
                            sessions !== "" &&
                            breakDuration !== "" &&
                            selectedCategorie !== ""
                    );
                } else {
                    setStartEnabled(
                        duration !== "" &&
                            sessions !== "" &&
                            selectedCategorie !== ""
                    );
                }
            } else {
                setStartEnabled(selectedCategorie !== ""); // Always enable for "Cronometro"
            }
        };

        enableButtons();
    }, [duration, sessions, breakDuration, selectedCategorie, mode]);

    // Reset inputs when resetInputs prop changes
    useEffect(() => {
        setDuration("");
        setSessions("");
        setBreakDuration("");
    }, [resetInputs]);

    const sessionFinished = () => {
        const totalDuration = parseInt(duration) * parseInt(sessions);
        dispatch(
            addSession({ category: selectedCategorie, duration: totalDuration })
        );
        setMessage("Session completada con éxito");
        setTimeModalVisible(false);
        setMessageModalVisble(true);
    };

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
                <CategoryList
                    categories={categories}
                    setSelectedCategorie={(value: string) =>
                        setSelectedCategoria(value)
                    }
                    selectedCategorie={selectedCategorie}
                />
                <ParametersList
                    mode={mode}
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
                    okClose={sessionFinished}
                    duration={parseInt(duration)}
                    sessions={parseInt(sessions)}
                    breakDuration={parseInt(breakDuration)}
                    mode={mode}
                />
            </View>
            <MessageModal
                message={message}
                visible={messageModalVisible}
                onClose={() => setMessageModalVisble(false)}
            />
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
