import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setThemePreference } from "../redux/themeSlice";
import { saveToStorage } from "../utils/StorageUtils";

export const ConfigurationScreen = () => {
    const themePreference = useSelector(
        (state: any) => state.theme.themePreference
    );
    const dispatch = useDispatch();

    const handleThemeChange = (value: string) => {
        dispatch(setThemePreference(value));
        saveToStorage("themePreference", value);
    };

    return (
        <RadioButton.Group
            onValueChange={handleThemeChange}
            value={themePreference}
        >
            <RadioButton.Item label="Claro" value="light" />
            <RadioButton.Item label="Oscuro" value="dark" />
            <RadioButton.Item label="Sistema" value="system" />
        </RadioButton.Group>
    );
};
