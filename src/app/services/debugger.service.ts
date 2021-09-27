import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LogLevel } from "../models/enums/log-level.enum";
import { LogModel } from "../models/log.model";

@Injectable({
    providedIn: 'root'
})
export class DebuggerService {

    public logs: LogModel[] = [];
    public onAddLog = new Subject<LogModel>();

    public log(level: LogLevel, content: string): void {
        const log: LogModel = { level, content };
        this.onAddLog.next(log);
        this.logs.push(log);
    }

    public logInfo(content: string): void {
        this.log(LogLevel.Info, content);
    }

    public logWarning(content: string): void {
        this.log(LogLevel.Warning, content);
    }

    public logError(content: string): void {
        this.log(LogLevel.Error, content);
    }
}