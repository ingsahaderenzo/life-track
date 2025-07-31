import { RadioButton, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setThemePreference } from "../store/themeSlice";
import { saveToStorage } from "../utils/StorageUtils";
import { View } from "react-native";

export const ConfigurationScreen = () => {
    const themePreference = useSelector(
        (state: any) => state.theme.themePreference
    );
    const dispatch = useDispatch();

    const theme = useTheme();

    const handleThemeChange = (value: string) => {
        dispatch(setThemePreference(value));
        saveToStorage("themePreference", value);
    };

    return (
        <View
            style={{
                height: "100%",
                width: "100%",
                padding: 20,
                backgroundColor: theme.colors.background,
            }}
        >
            <RadioButton.Group
                onValueChange={handleThemeChange}
                value={themePreference}
            >
                <RadioButton.Item label="Claro" value="light" />
                <RadioButton.Item label="Oscuro" value="dark" />
                <RadioButton.Item label="Sistema" value="system" />
            </RadioButton.Group>
        </View>
    );
};
