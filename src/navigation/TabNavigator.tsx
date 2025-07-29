import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import SessionScreen from "../screens/SessionScreen";
import { ConfigurationScreen } from "../screens/ConfigurationScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const theme = useTheme();

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="session" // Lo ponemos de forma temporal para el dev
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 25,
                        left: 0,
                        right: 0,
                        marginHorizontal: "auto",
                        alignSelf: "center",
                        elevation: 5,
                        backgroundColor: theme.colors.background,
                        borderRadius: 20,
                        height: 70,
                        maxWidth: 500,
                        width: "90%",
                        shadowColor: "#000",
                        shadowOpacity: 0.5,
                        shadowOffset: { width: 0, height: 8 },
                        shadowRadius: 10,
                        borderTopWidth: 0,
                        borderTopColor: "transparent",
                    },
                }}
            >
                <Tab.Screen
                    name="session"
                    component={SessionScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                icon="clock-time-four"
                                size={24}
                                containerColor={
                                    focused
                                        ? theme.colors.primary
                                        : "transparent"
                                }
                                iconColor={
                                    focused
                                        ? theme.colors.onPrimary
                                        : theme.colors.primary
                                }
                                rippleColor={theme.colors.primary}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                icon="home"
                                size={24}
                                containerColor={
                                    focused
                                        ? theme.colors.primary
                                        : "transparent"
                                }
                                iconColor={
                                    focused
                                        ? theme.colors.onPrimary
                                        : theme.colors.primary
                                }
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="configuration"
                    component={ConfigurationScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                icon="cog"
                                size={24}
                                containerColor={
                                    focused
                                        ? theme.colors.primary
                                        : "transparent"
                                }
                                iconColor={
                                    focused
                                        ? theme.colors.onPrimary
                                        : theme.colors.primary
                                }
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
