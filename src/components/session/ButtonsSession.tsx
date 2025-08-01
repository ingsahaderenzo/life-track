import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";

type ButtonsSessionProps = {
    startEnabled: boolean;
    setResetInputs: (reset: boolean) => void;
    resetInputs: boolean;
    mode: "Temporizador" | "Cronometro";
    startTimer: () => void;
};

const ButtonsSession = ({
    startEnabled,
    setResetInputs,
    resetInputs,
    mode,
    startTimer,
}: ButtonsSessionProps) => {
    const theme = useTheme();

    // Function to start the session
    const handleStart = () => {
        startTimer();
    };

    // Toggle reset inputs state
    const handleReset = () => {
        setResetInputs(!resetInputs);
    };

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={handleStart}
                disabled={!startEnabled}
                icon={"play"}
                children={"Iniciar"}
                style={styles.buttonPlay}
            />

            {mode === "Temporizador" && (
                <IconButton
                    icon="restart"
                    mode="outlined"
                    onPress={handleReset}
                    iconColor={theme.colors.primary}
                    style={[
                        styles.buttonReset,
                        { borderColor: theme.colors.primary, borderWidth: 2 },
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    buttonPlay: {
        width: 200,
        borderRadius: 4,
        marginRight: 4,
    },
    buttonReset: {
        borderRadius: 4,
    },
});

export default ButtonsSession;
