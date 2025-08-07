import { useTheme, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import FirstStats from "../components/stats/FirtStats";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function HomeScreen() {
    const theme = useTheme();

    const stats = useSelector((store: RootState) => store.stats.stats);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <Text variant="displaySmall">Estadísticas 📊</Text>
            <Text variant="bodyLarge">Tu progreso y análisis</Text>
            <FirstStats
                monthTotal={stats.stadistics.monthTotal}
                todayFocus={stats.stadistics.todayFocus}
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
        paddingTop: 30,
    },
});
