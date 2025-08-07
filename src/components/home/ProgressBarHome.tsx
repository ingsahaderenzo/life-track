import { View, StyleSheet } from "react-native";
import { Text, useTheme, ProgressBar } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ProgressBarHome = () => {
    const theme = useTheme();

    const todayFocus = useSelector(
        (store: RootState) => store.stats.stats.stadistics.todayFocus
    );

    const targetDuration = useSelector(
        (store: RootState) => store.stats.stats.stadistics.targetDuration
    );

    const percent =
        todayFocus / targetDuration < 1 ? todayFocus / targetDuration : 1;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.secondaryContainer },
            ]}
        >
            <Text variant="headlineMedium">Progreso de hoy</Text>
            <View style={styles.timeContainer}>
                <Text>Tiempo de enfoque</Text>
                <Text>
                    {todayFocus} / {targetDuration} min
                </Text>
            </View>
            <View style={styles.progressContainer}>
                <ProgressBar
                    animatedValue={percent}
                    style={styles.progressBar}
                />
                <Text>{percent * 100}% Completo</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    timeContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 10,
    },
    progressContainer: {
        width: "100%",
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
    },
    progressBar: {
        height: 7,
    },
});

export default ProgressBarHome;
