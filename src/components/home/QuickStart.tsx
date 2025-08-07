import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import QuickStartButton from "./QuickStartButton";
import { QuickStartData } from "../../types/QuickStartData";

type props = {
    data: QuickStartData[];
    selectQuickStart: (value: QuickStartData) => void;
};

const QuickStart = ({ data, selectQuickStart }: props) => {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.secondaryContainer },
            ]}
        >
            <Text variant="headlineSmall">Inicio rápido</Text>
            {data.length > 0 ? (
                <View style={styles.buttonContainer}>
                    {data.map((quickStart) => (
                        <QuickStartButton
                            data={quickStart}
                            onClick={selectQuickStart}
                        />
                    ))}
                </View>
            ) : (
                <Text variant="bodyLarge" style={styles.advice}>
                    No te olvides de crear tus inicios rápidos! 😎​
                </Text>
            )}
        </View>
    );
};

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
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    advice: {
        marginTop: 10,
    },
});

export default QuickStart;
