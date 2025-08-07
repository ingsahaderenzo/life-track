import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const StreakCount = () => {
    const theme = useTheme();

    const currentStreak = useSelector(
        (store: RootState) => store.stats.stats.stadistics.currentStreak
    );

    const todyaSessions = useSelector(
        (store: RootState) => store.stats.stats.stadistics.todaySessions
    );

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.body,
                    { backgroundColor: theme.colors.secondaryContainer },
                ]}
            >
                <Text variant="titleLarge">Racha</Text>
                <Text
                    variant="displaySmall"
                    style={{ fontWeight: "bold", marginVertical: 10 }}
                >
                    {currentStreak}
                </Text>
                <Text>Días seguidos</Text>
            </View>
            <View
                style={[
                    styles.body,
                    { backgroundColor: theme.colors.secondaryContainer },
                ]}
            >
                <Text variant="titleLarge">Hoy</Text>
                <Text
                    variant="displaySmall"
                    style={{ fontWeight: "bold", marginVertical: 10 }}
                >
                    {todyaSessions}
                </Text>
                <Text>Sesiones completadas</Text>
            </View>
        </View>
    );
};

export default StreakCount;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        maxWidth: 500,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 10,
    },
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "45%",
        maxWidth: 500,
        padding: 20,
        marginTop: 40,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
    },
});
