import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const isNative = Platform.OS !== "web";

// Function to save data to storage and works for both web and native platforms
export const saveToStorage = async (key: string, value: any): Promise<void> => {
    try {
        if (value === undefined) {
            throw new Error(`No se puede guardar 'undefined' en ${key}`);
        }
        const data = JSON.stringify(value);
        if (isNative) {
            await AsyncStorage.setItem(key, data);
        } else {
            localStorage.setItem(key, data);
        }
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
    }
};

// Function to retrieve data from storage and works for both web and native platforms
export const getFromStorage = async <T>(key: string): Promise<T | null> => {
    try {
        let data: string | null = null;
        if (isNative) {
            data = await AsyncStorage.getItem(key);
        } else {
            data = localStorage.getItem(key);
        }
        return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
        console.error(`Error retrieving ${key}:`, error);
        return null;
    }
};
