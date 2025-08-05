import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import HomeHeader from "../components/home/HomeHeader";
import StreakCount from "../components/home/StreakCount";
import ProgressBarHome from "../components/home/ProgressBarHome";

export default function HomeScreen() {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <HomeHeader />
            <StreakCount />
            <ProgressBarHome />
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
