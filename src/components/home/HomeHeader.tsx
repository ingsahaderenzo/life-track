import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const HomeHeader = () => {
    const today = new Date();

    // Arrays para convertir números a nombres
    const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    // Obtener cada componente de la fecha
    const diaSemana = diasSemana[today.getDay()]; // 0 = Domingo, 1 = Lunes, etc.
    const numeroDia = today.getDate(); // 1-31
    const nombreMes = meses[today.getMonth()]; // 0 = Enero, 1 = Febrero, etc.
    const anio = today.getFullYear(); // Año completo (ej: 2025)

    return (
        <View style={styles.body}>
            <Text variant="displaySmall">Buenos dias! 👋</Text>
            <Text variant="bodyLarge" style={styles.date}>
                {diaSemana}, {numeroDia} de {nombreMes} de {anio}
            </Text>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        marginTop: 40,
    },
    date: {
        marginTop: 10,
    },
});
