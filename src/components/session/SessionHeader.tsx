import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type props = {
    mode: "Cronometro" | "Temporizador";
    setMode: (palabra: "Cronometro" | "Temporizador") => void;
};

// Bring the theme from react-native-paper

const SessionHeader = ({ mode, setMode }: props) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: theme.colors.onBackground }]}>
                {mode}
            </Text>
            <Text
                style={[styles.subtitle, { color: theme.colors.onBackground }]}
            >
                Configura tu sesión de enfoque
            </Text>
            <View
                style={[
                    styles.buttonContainer,
                    { backgroundColor: theme.colors.background },
                ]}
            >
                <TouchableOpacity
                    onPress={() => setMode("Cronometro")}
                    style={[
                        styles.button,
                        mode === "Cronometro"
                            ? {
                                  backgroundColor: theme.colors.shadow,
                              }
                            : {},
                    ]}
                >
                    <Text
                        style={{
                            color: theme.colors.onBackground,
                            fontWeight:
                                mode === "Cronometro" ? "bold" : "normal",
                            fontStyle:
                                mode === "Cronometro" ? "normal" : "italic",
                        }}
                    >
                        Cronometro
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setMode("Temporizador")}
                    style={[
                        styles.button,
                        mode === "Temporizador"
                            ? { backgroundColor: theme.colors.shadow }
                            : {},
                    ]}
                >
                    <Text
                        style={{
                            color: theme.colors.onBackground,
                            fontWeight:
                                mode === "Temporizador" ? "bold" : "normal",
                            fontStyle:
                                mode === "Temporizador" ? "normal" : "italic",
                        }}
                    >
                        Temporizador
                    </Text>
                </TouchableOpacity>
            </View>
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "90%",
        maxWidth: 300,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

export default SessionHeader;
