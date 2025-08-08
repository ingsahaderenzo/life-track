import { View, StyleSheet } from "react-native";
import { useTheme, Text, SegmentedButtons } from "react-native-paper";

type Props = {
    mode: "Cronometro" | "Temporizador";
    setMode: (palabra: "Cronometro" | "Temporizador") => void;
};

const SessionHeader = ({ mode, setMode }: Props) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text
                variant="displaySmall"
                style={{ color: theme.colors.onBackground }}
            >
                {mode}
            </Text>

            <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onBackground, marginTop: 4 }}
            >
                Configura tu sesión de enfoque
            </Text>

            <SegmentedButtons
                value={mode}
                onValueChange={setMode}
                buttons={[
                    { value: "Cronometro", label: "Cronómetro" },
                    { value: "Temporizador", label: "Temporizador" },
                ]}
                style={{ marginTop: 20, minWidth: 300 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        borderRadius: 10,
        padding: 5,
        marginTop: 12,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "90%",
        maxWidth: 330,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

export default SessionHeader;
