import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { QuickStartData } from "../../types/QuickStartData";

type props = {
    data: QuickStartData;
    onClick: (value: QuickStartData) => void;
};

const QuickStart = ({ data, onClick }: props) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            style={[styles.container, { borderColor: theme.colors.primary }]}
            onPress={() => onClick(data)}
        >
            <View style={styles.button}>
                <Text variant="bodyLarge">{data.category}</Text>
                {data.mode === "Temporizador" ? (
                    <Text style={styles.text}>
                        {data.sessions} sesión/es de {data.duration} minuto/s{" "}
                        {data.breakDuration > 0
                            ? `con un descanso de ${data.breakDuration} minuto/s`
                            : ""}
                    </Text>
                ) : (
                    <Text style={styles.text}>Cronometro</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "45%",
        minWidth: 120,
        padding: 20,
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 2,
    },
    button: {
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        marginTop: 5,
    },
});

export default QuickStart;
