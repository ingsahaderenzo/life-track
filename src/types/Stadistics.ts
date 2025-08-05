export interface Stadistics {
    monthTotal: number; // Total del mes actual
    lastMonthTotal: number; // Total del mes pasado
    dailyAverage: number; // Promedio diario
    bestStreak: number; // Mayor racha de días seguidos
    bestDay: number; // Día con más duración
    maxSessionsPerDay: number; // Mayor número de sesiones en un solo día
    longestSession: number; // Sesión más larga registrada
    currentStreak: number; // Racha actual
    todaySessions: number; // Cantidad de sesiones hoy
    targetDuration: number; // Tiempo objetivo por día
    todayFocus: number; // Tiempo total de enfoque hoy
}
