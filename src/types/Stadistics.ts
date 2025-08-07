export interface Stadistics {
    // Datos de hoy
    todayFocus: number; // Tiempo total de enfoque hoy
    todaySessions: number; // Cantidad de sesiones hoy

    // Datos de este mes
    monthTotal: number; // Total del mes actual

    // Maximos
    maxSessionsPerDay: number; // Mayor número de sesiones en un solo día
    longestSession: number; // Sesión más larga registrada
    bestDay: number; // Día con más duración
    bestStreak: number; // Mayor racha de días seguidos

    // Datos generales
    targetDuration: number; // Tiempo objetivo por día

    //Datos actuales
    currentStreak: number; // Racha actual

    // Datos pasados
    lastMonthTotal: number; // Total del mes pasado

    // Datos auxiliares
    lastSession: string; // Fecha de la ultima sessión
}
