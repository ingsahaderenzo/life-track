import {
    MD3LightTheme as DefaultLightTheme,
    MD3DarkTheme as DefaultDarkTheme,
} from "react-native-paper";

const lightTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        primary: "#FF7043", // Naranja similar al de la imagen
        secondary: "#4FC3F7", // Azul claro
        tertiary: "#81C784", // Verde claro
        background: "#FFFFFF", // Fondo blanco
        surface: "#FFFFFF", // Superficie blanca
        error: "#E53935", // Rojo para errores
        onBackground: "#000000", // Texto negro
        onSurface: "#000000", // Texto negro
    },
};

const darkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        primary: "#FF8A65", // Naranja un poco más claro para el modo oscuro
        secondary: "#81D4FA", // Azul claro para el modo oscuro
        tertiary: "#A5D6A7", // Verde claro para el modo oscuro
        background: "#121212", // Fondo oscuro
        surface: "#121212", // Superficie oscura
        error: "#EF9A9A", // Rojo más claro para errores en modo oscuro
        onBackground: "#FFFFFF", // Texto blanco
        onSurface: "#FFFFFF", // Texto blanco
        onPrimary: "#121212", // Texto oscuro sobre el primario
        onSecondary: "#121212", // Texto oscuro sobre el secundario
    },
};

export const theme = {
    light: lightTheme,
    dark: darkTheme,
};

export type AppTheme = typeof lightTheme;
