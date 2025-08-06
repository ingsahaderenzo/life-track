export const getCurrentDateKey = (): string => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const getCurrentMonthKey = (): string => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    return `${now.getFullYear()}-${month}`; // YYYY-MM
};

export const getCurrentWeekKey = (): string => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor(
        (now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)
    );
    const week = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week.toString().padStart(2, "0")}`; // YYYY-W##
};

export const getYesterdayDateKey = (): string => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return yesterday.toISOString().split("T")[0]; // "YYYY-MM-DD"
};
