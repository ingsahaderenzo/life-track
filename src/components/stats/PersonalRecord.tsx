import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type props = {
    bestStreak: number;
    bestDay: number;
    maxSessionsPerDay: number;
    longestSession: number;
};

const PersonalRecord = ({
    longestSession,
    bestDay,
    bestStreak,
    maxSessionsPerDay,
}: props) => {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.secondaryContainer },
            ]}
        >
            <Text variant="titleLarge">Records personales</Text>
            <View style={styles.boxContainer}>
                <View style={[styles.box, { backgroundColor: "#f8ffdb6e" }]}>
                    <Text
                        style={{
                            fontWeight: "bold",
                        }}
                        variant="headlineSmall"
                    >
                        {bestStreak} dias
                    </Text>
                    <Text>Mejor racha</Text>
                </View>
                <View style={[styles.box, { backgroundColor: "#ffdbdb6e" }]}>
                    <Text
                        style={{
                            fontWeight: "bold",
                        }}
                        variant="headlineSmall"
                    >
                        {bestDay <= 60 ? `${bestDay} min` : `${bestDay / 60} h`}
                    </Text>
                    <Text>Mejor día</Text>
                </View>
                <View style={[styles.box, { backgroundColor: "#dbffdd6e" }]}>
                    <Text
                        style={{
                            fontWeight: "bold",
                        }}
                        variant="headlineSmall"
                    >
                        {maxSessionsPerDay} sesiones
                    </Text>
                    <Text>Max sesiones/dia</Text>
                </View>
                <View style={[styles.box, { backgroundColor: "#fedbff6e" }]}>
                    <Text
                        style={{
                            fontWeight: "bold",
                        }}
                        variant="headlineSmall"
                    >
                        {longestSession <= 60
                            ? `${longestSession} min`
                            : `${longestSession / 60} h`}
                    </Text>
                    <Text>Sesión mas larga</Text>
                </View>
            </View>
        </View>
    );
};

export default PersonalRecord;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        maxWidth: 500,
        padding: 20,
        marginTop: 40,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
    },
    boxContainer: {
        marginTop: 20,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    box: {
        width: "45%",
        minWidth: 100,
        height: 80,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
});
