import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PomodoroScreen from "../screens/PomodoroScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen
                    name="pomodoro"
                    component={PomodoroScreen}
                ></Stack.Screen>
                <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
