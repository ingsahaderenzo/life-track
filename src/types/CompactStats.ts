export interface CompactStats {
    totalByWeek: {
        [weekKey: string]: number;
    };
    totalByMonth: {
        [monthKey: string]: number;
    };
}
