import { LogLevel } from "./enums/log-level.enum";

export interface LogModel {
    level: LogLevel;
    content: string;
    count: number;
}