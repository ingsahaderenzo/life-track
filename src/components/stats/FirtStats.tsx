import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

type props = {
    monthTotal: number;
    todayFocus: number;
};

const FirstStats = ({ monthTotal, todayFocus }: props) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.body,
                    { backgroundColor: theme.colors.secondaryContainer },
                ]}
            >
                <Text variant="titleLarge">Total este mes</Text>
                <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", marginVertical: 10 }}
                >
                    {monthTotal > 60
                        ? `${(monthTotal / 60).toFixed(1)} h`
                        : `${monthTotal} min`}
                </Text>
            </View>
            <View
                style={[
                    styles.body,
                    { backgroundColor: theme.colors.secondaryContainer },
                ]}
            >
                <Text variant="titleLarge" style={styles.text}>
                    Hoy te has enfocado
                </Text>
                <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", marginVertical: 10 }}
                >
                    {todayFocus > 60
                        ? `${(todayFocus / 60).toFixed(1)} h`
                        : `${todayFocus} min`}
                </Text>
            </View>
        </View>
    );
};

export default FirstStats;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        maxWidth: 500,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch", // ← para que los hijos se estiren
        gap: 20, // RN no soporta gap nativo; puedes usar margin en los hijos
    },
    body: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1, // ← ocupa todo el espacio disponible
        alignSelf: "stretch", // ← fuerza estirarse a la altura del contenedor
        padding: 20,
        marginTop: 40,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
        // opcional: si quieres un gap entre cards en iOS/Android:
        marginHorizontal: 10,
    },
    text: {
        textAlign: "center",
    },
});
