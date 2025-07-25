import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const isNative = Platform.OS !== "web";

// Function to save data to storage and works for both web and native platforms
export const saveToStorage = async (key: string, value: any): Promise<void> => {
    try {
        const data = JSON.stringify(value); // Convert value to string
        if (isNative) {
            // Use AsyncStorage for native platforms
            await AsyncStorage.setItem(key, data);
        } else {
            // Use localStorage for web
            localStorage.setItem(key, data);
        }
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
    }
};

// Function to retrieve data from storage and works for both web and native platforms
export const getFromStorage = async <T>(key: string): Promise<T> => {
    try {
        let data: string | null = null;
        if (isNative) {
            // Use AsyncStorage for native platforms
            data = await AsyncStorage.getItem(key);
        } else {
            // Use localStorage for web
            data = localStorage.getItem(key);
        }
        // Parse the data if it exists, otherwise return an empty array
        return data ? (JSON.parse(data) as T) : ([] as T);
    } catch (error) {
        console.error(`Error retrieving ${key}:`, error);
        return [] as T;
    }
};
