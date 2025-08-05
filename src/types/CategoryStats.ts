import { CategoryTimeMap } from "./types";

export interface CategoryStats {
    [periodKey: string]: CategoryTimeMap;
}
