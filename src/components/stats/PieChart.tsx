import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, useTheme } from "react-native-paper";
import { VictoryPie } from "victory-pie";
import { CategoryStats } from "../../types/CategoryStats";
import {
    getCurrentDateKey,
    getCurrentMonthKey,
    getCurrentWeekKey,
} from "../../utils/TimeUtils";
import { CategoryTimeMap } from "../../types/types";

type CategoryData = {
    x: string; // etiqueta
    y: number; // valor numérico
    color: string; // color de la porción
};

type categoryStats = {
    daily: CategoryStats;
    weekly: CategoryStats;
    monthly: CategoryStats;
};

const PieChart = ({ daily, monthly, weekly }: categoryStats) => {
    const theme = useTheme();

    const [data, setData] = useState<CategoryData[]>([]);
    const [selectedTime, setSelectedTime] = useState<"Dia" | "Semana" | "Anio">(
        "Dia"
    );

    // Encargado de definir los datos a mostrar
    useEffect(() => {
        let statsForPeriod: CategoryTimeMap = {};

        if (selectedTime === "Dia") {
            statsForPeriod = daily[getCurrentDateKey()] || {};
        } else if (selectedTime === "Semana") {
            statsForPeriod = weekly[getCurrentWeekKey()] || {};
        } else {
            statsForPeriod = monthly[getCurrentMonthKey()] || {};
        }

        // Pasar a array y ordenar
        let allData = Object.entries(statsForPeriod)
            .filter(([_, duration]) => duration > 0)
            .map(([categoryName, duration]) => ({
                x: categoryName,
                y: duration,
            }))
            .sort((a, b) => b.y - a.y);

        // Agrupar si hay más de 5 categorías
        if (allData.length > 5) {
            const topFive = allData.slice(0, 5);
            const othersTotal = allData
                .slice(5)
                .reduce((sum, item) => sum + item.y, 0);
            topFive.push({ x: "Otros", y: othersTotal });
            allData = topFive;
        }

        const colors = [
            "#4CAF50",
            "#2196F3",
            "#FFC107",
            "#FF5722",
            "#9C27B0",
            "#607D8B",
        ];

        const dataWithColors = allData.map((item, i) => ({
            ...item,
            color: colors[i % colors.length],
        }));

        setData(dataWithColors);
    }, [selectedTime, daily, weekly, monthly]);

    const formatDuration = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        return `${(minutes / 60).toFixed(1)} h`;
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.secondaryContainer },
            ]}
        >
            <Text variant="titleLarge">Distribución por categoria</Text>
            <SegmentedButtons
                value={selectedTime}
                onValueChange={(value) => {
                    setSelectedTime(value);
                }}
                buttons={[
                    { value: "Dia", label: "Diario" },
                    { value: "Semana", label: "Semanal" },
                    { value: "Anio", label: "Anual" },
                    { value: "Anio", label: "Histórico" },
                ]}
                style={{ marginTop: 20, minWidth: 400 }}
            />
            {data.length > 0 ? (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <VictoryPie
                        data={data}
                        x="x"
                        y="y"
                        innerRadius={70}
                        labels={() => null}
                        width={200}
                        height={200}
                        padding={15}
                        colorScale={data.map((item) => item.color)}
                    />
                    <View style={{ marginLeft: 20 }}>
                        {data.map((d) => {
                            const percent = (
                                (d.y / data.reduce((sum, i) => sum + i.y, 0)) *
                                100
                            ).toFixed(0);
                            return (
                                <View key={d.x} style={styles.legendItem}>
                                    <View
                                        style={[
                                            styles.dot,
                                            { backgroundColor: d.color },
                                        ]}
                                    />
                                    <Text style={styles.legendText}>
                                        {d.x} — {percent}% (
                                        {formatDuration(d.y)})
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            ) : (
                <Text>No hay estadísticas para este periodo</Text>
            )}
        </View>
    );
};

export default PieChart;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        maxWidth: 500,
        padding: 20,
        marginTop: 40,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    chartContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    centerLabel: {
        position: "absolute",
        alignItems: "center",
    },
    centerNumber: {
        fontSize: 32,
        fontWeight: "bold",
    },
    centerText: {
        fontSize: 12,
        color: "#555",
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    legendText: {
        fontSize: 14,
    },
});
