import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen({ navigation }: any) {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate("pomodoro")}
            >
                Ir a pomodoro
            </Button>
        </View>
    );
}
