// src/screens/TimerModal.tsx
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Modal, AppState } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import * as Notifications from "expo-notifications";

type TimerModalProps = {
    visible: boolean;
    forceClose: () => void;
    okClose: () => void;
    mode: "Temporizador" | "Cronometro";
    duration?: number; // minutos de sesión
    sessions?: number; // número de sesiones
    breakDuration?: number; // minutos de descanso
};

export default function TimerModal({
    visible,
    forceClose,
    okClose,
    mode,
    duration = 0,
    sessions = 1,
    breakDuration = 0,
}: TimerModalProps) {
    const theme = useTheme();

    // Valores seguros
    const d = Number.isNaN(duration) ? 0 : duration;
    const s = Number.isNaN(sessions) || sessions < 1 ? 1 : sessions;
    const b = Number.isNaN(breakDuration) ? 0 : breakDuration;

    // Timestamps y estado de fase
    const [startTime, setStartTime] = useState(0);
    const [periodSeconds, setPeriodSeconds] = useState(0);
    const [phase, setPhase] = useState<"work" | "break">("work");
    const [sessionsLeft, setSessionsLeft] = useState(s);
    const [currentTime, setCurrentTime] = useState(Date.now()); // Para forzar re-renders
    const [notificationId, setNotificationId] = useState<string | null>(null); // Para tracking específico

    // Cleanup al cerrar modal
    useEffect(() => {
        if (!visible && notificationId) {
            Notifications.cancelScheduledNotificationAsync(notificationId);
            setNotificationId(null);
        }
    }, [visible, notificationId]);

    // Efecto para actualizar el contador cada segundo
    useEffect(() => {
        if (!visible) return;

        const interval = setInterval(() => {
            const now = Date.now();
            setCurrentTime(now); // Actualizar estado para forzar re-render

            // Solo verificar tiempo límite en modo temporizador
            if (mode === "Temporizador" && periodSeconds > 0) {
                const elapsed = (now - startTime) / 1000;
                if (elapsed >= periodSeconds) {
                    advancePhase();
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [visible, startTime, periodSeconds, phase, sessionsLeft, mode]);

    // Al volver a foreground, recalcula
    useEffect(() => {
        const sub = AppState.addEventListener("change", (state) => {
            if (state === "active" && visible) {
                recalc();
            }
        });
        return () => sub.remove();
    }, [visible, phase, sessionsLeft, startTime, periodSeconds, mode]);

    // Inicializa la fase al abrir modal o cambiar props
    useEffect(() => {
        if (!visible) return;

        if (mode === "Temporizador") {
            setPhase("work");
            setSessionsLeft(s);
            preparePhase(d * 60);
        } else {
            // Cronómetro: iniciar en 0 y contar hacia arriba
            setPhase("work");
            preparePhase(0); // 0 segundos = sin límite de tiempo
        }
    }, [visible, mode, d, s, b]);

    // Prepara una fase: setea timestamp y programar notificación
    const preparePhase = async (seconds: number) => {
        const now = Date.now();
        setStartTime(now);
        setPeriodSeconds(seconds);
        setCurrentTime(now); // Sincronizar currentTime con startTime

        // Cancelar notificación anterior específica
        if (notificationId) {
            await Notifications.cancelScheduledNotificationAsync(
                notificationId
            );
            setNotificationId(null);
        }

        // Solo programar notificación para temporizador con duración > 0
        if (mode === "Temporizador" && seconds > 0) {
            try {
                const identifier =
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title:
                                phase === "work"
                                    ? "Sesión terminada"
                                    : "Descanso terminado",
                            body:
                                phase === "work"
                                    ? sessionsLeft > 1
                                        ? "Tiempo de descanso."
                                        : "¡Todas las sesiones completadas!"
                                    : "Es hora de volver al trabajo.",
                            sound: "default",
                        },
                        trigger: {
                            type: Notifications.SchedulableTriggerInputTypes
                                .DATE,
                            date: new Date(now + seconds * 1000),
                        },
                    });
                setNotificationId(identifier);
            } catch (error) {
                console.warn("Error programando notificación:", error);
            }
        }
    };

    // Recalcula tiempo restante - versión simplificada y robusta
    const recalc = () => {
        if (mode !== "Temporizador" || periodSeconds === 0) return;

        const now = Date.now();
        const elapsed = (now - startTime) / 1000;

        // Si el tiempo no ha expirado, actualizar currentTime y continuar
        if (elapsed < periodSeconds) {
            setCurrentTime(now);
            return;
        }

        // El tiempo ha expirado, avanzar a la siguiente fase
        if (phase === "work") {
            if (sessionsLeft > 1) {
                setPhase("break");
                setSessionsLeft((prev) => prev - 1);
                preparePhase(b * 60);
            } else {
                // Todas las sesiones completadas
                okClose();
            }
        } else {
            // Terminar descanso, volver al trabajo
            setPhase("work");
            preparePhase(d * 60);
        }
    };

    // Avanza fase o cierra modal
    const advancePhase = () => {
        if (mode === "Cronometro") return;
        if (phase === "work") {
            if (sessionsLeft > 1) {
                setPhase("break");
                setSessionsLeft((n) => n - 1);
                preparePhase(b * 60);
            } else {
                okClose();
            }
        } else {
            setPhase("work");
            preparePhase(d * 60);
        }
    };

    // Función mejorada para cerrar y limpiar
    const handleForceClose = async () => {
        if (notificationId) {
            await Notifications.cancelScheduledNotificationAsync(
                notificationId
            );
            setNotificationId(null);
        }
        forceClose();
    };

    // Formatea MM:SS
    const formatTime = () => {
        if (startTime === 0) return "00:00";

        let timeToShow;
        if (mode === "Cronometro") {
            // Cronómetro cuenta hacia arriba
            timeToShow = (currentTime - startTime) / 1000;
        } else {
            // Temporizador cuenta hacia abajo
            timeToShow = Math.max(
                0,
                periodSeconds - (currentTime - startTime) / 1000
            );
        }

        const mm = Math.floor(timeToShow / 60)
            .toString()
            .padStart(2, "0");
        const ss = Math.floor(timeToShow % 60)
            .toString()
            .padStart(2, "0");
        return `${mm}:${ss}`;
    };

    // Colores invertidos en descanso
    const isBreak = mode === "Temporizador" && phase === "break";
    const backgroundColor = isBreak
        ? theme.colors.primary
        : theme.colors.background;
    const textColor = isBreak ? theme.colors.onPrimary : theme.colors.primary;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
        >
            <View style={[styles.container, { backgroundColor }]}>
                <Text variant="displayLarge" style={{ color: textColor }}>
                    {formatTime()}
                </Text>

                {/* Información adicional para temporizador */}
                {mode === "Temporizador" && (
                    <Text
                        variant="titleMedium"
                        style={{
                            color: textColor,
                            marginTop: 10,
                            opacity: 0.8,
                        }}
                    >
                        {phase === "work" ? "Sesión de trabajo" : "Descanso"}
                        {sessionsLeft > 1 && ` • ${sessionsLeft} restantes`}
                    </Text>
                )}

                <Button
                    mode="contained"
                    onPress={handleForceClose}
                    style={{ marginTop: 20 }}
                    buttonColor={
                        isBreak ? theme.colors.onPrimary : theme.colors.primary
                    }
                    textColor={
                        isBreak ? theme.colors.primary : theme.colors.onPrimary
                    }
                >
                    Detener
                </Button>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
