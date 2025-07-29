import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

type props = {
    mode: "Cronometro" | "Temporizador";
    setMode: (palabra: "Cronometro" | "Temporizador") => void;
};

const SessionHeader = ({ mode, setMode }: props) => {
    const theme = useTheme();

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Text
                style={{
                    color: theme.colors.onBackground,
                }}
            >
                {mode}
            </Text>
        </View>
    );
};

export default SessionHeader;
