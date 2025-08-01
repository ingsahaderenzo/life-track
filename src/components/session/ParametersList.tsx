import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

type ParametersListProps = {
    mode: "Temporizador" | "Cronometro";
    setStartEnabled: (enabled: boolean) => void;
    resetInputs: boolean;
    setDuration: (duration: string) => void;
    setSessions: (sessions: string) => void;
    setBreakDuration: (breakDuration: string) => void;
    duration: string;
    sessions: string;
    breakDuration: string;
};

const ParametersList = ({
    mode,
    setStartEnabled,
    resetInputs,
    setDuration,
    setSessions,
    setBreakDuration,
    duration,
    sessions,
    breakDuration,
}: ParametersListProps) => {
    const theme = useTheme();

    // Show resume only if in "Temporizador" mode and both duration and sessions are set
    const showResume =
        mode === "Temporizador" && sessions !== "" && duration !== "";

    // Handle changes for duration and sessions input fields
    const handleDurationChange = (text: string) => {
        const numericOnly = text.replace(/[^0-9]/g, "");
        setDuration(numericOnly);
    };

    const handleSessionsChange = (text: string) => {
        const numericOnly = text.replace(/[^0-9]/g, "");
        setSessions(numericOnly);
        if (parseInt(numericOnly) <= 1) {
            setBreakDuration(""); // Reset break duration if sessions is 1 or less
        }
    };

    const handleBreakDurationChange = (text: string) => {
        const numericOnly = text.replace(/[^0-9]/g, "");
        setBreakDuration(numericOnly);
    };

    // Verify inputs and enable/disable start button
    useEffect(() => {
        const enableButtons = () => {
            if (mode === "Temporizador") {
                if (parseInt(sessions) > 1) {
                    setStartEnabled(
                        duration !== "" &&
                            sessions !== "" &&
                            breakDuration !== ""
                    );
                } else {
                    setStartEnabled(duration !== "" && sessions !== "");
                }
            } else {
                setStartEnabled(true); // Always enable for "Cronometro"
            }
        };

        enableButtons();
    }, [duration, sessions, breakDuration, mode]);

    // Reset inputs when resetInputs prop changes
    useEffect(() => {
        setDuration("");
        setSessions("");
        setBreakDuration("");
    }, [resetInputs]);

    return (
        <View style={styles.container}>
            <Text variant="titleLarge">
                {mode === "Cronometro"
                    ? "Configuración del cronómetro"
                    : "Configuración del temporizador"}
            </Text>
            {mode === "Temporizador" ? (
                <View style={styles.buttonsContainer}>
                    <TextInput
                        label="Duración en minutos"
                        placeholder="0"
                        keyboardType="numeric"
                        mode="outlined"
                        right={<TextInput.Affix text="min" />}
                        value={duration}
                        onChangeText={handleDurationChange}
                    />
                    <TextInput
                        label="Cantidad de sesiones"
                        placeholder="0"
                        keyboardType="numeric"
                        mode="outlined"
                        right={<TextInput.Affix text="sesiones" />}
                        value={sessions}
                        onChangeText={handleSessionsChange}
                    />
                    {parseInt(sessions) > 1 && (
                        <TextInput
                            label="Duración de cada descanso"
                            placeholder="0"
                            keyboardType="numeric"
                            mode="outlined"
                            right={<TextInput.Affix text="min" />}
                            value={breakDuration}
                            onChangeText={handleBreakDurationChange}
                        />
                    )}
                </View>
            ) : (
                <View
                    style={[
                        styles.resume,
                        {
                            borderWidth: 1.5,
                            borderColor: theme.colors.outline,
                            backgroundColor: theme.colors.surface,
                        },
                    ]}
                >
                    <Text
                        variant="titleLarge"
                        style={{
                            marginBottom: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        Modo libre
                    </Text>
                    <Text
                        variant="bodyLarge"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Presiona iniciar y el cronómetro comenzará.
                        {"\n"}
                        Tú decides cuándo parar.
                    </Text>
                </View>
            )}

            {showResume && (
                <View
                    style={[
                        styles.resume,
                        {
                            borderWidth: 1.5,
                            borderColor: theme.colors.outline,
                            backgroundColor: theme.colors.surface,
                        },
                    ]}
                >
                    <Text
                        variant="titleLarge"
                        style={{
                            marginBottom: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        Resumen de la configuración
                    </Text>
                    <Text
                        variant="bodyLarge"
                        style={{
                            marginBottom: 10,
                            textAlign: "center",
                        }}
                    >
                        Se hará/n {sessions} sesión/es de enfoque con una
                        duración de {duration} minutos{" "}
                        {breakDuration !== "" &&
                            `con un descanso de ${breakDuration} minutos entre cada sesión`}
                        .
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: "100%",
        maxWidth: 400,
        flexDirection: "column",
        alignItems: "center",
    },
    buttonsContainer: {
        flexDirection: "column",
        gap: 10,
        width: "90%",
        marginTop: 10,
    },
    resume: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
        width: "100%",
    },
});

export default ParametersList;
