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
        let log: LogModel = { level, content, count: 0 };
        const previousLog = this.logs[this.logs.length - 1];
        if (!previousLog || previousLog.content !== content) {
            this.onAddLog.next(log);
            this.logs.push(log);
            return;
        }

        log = { ...log, count: previousLog.count + 1 }
        this.logs[this.logs.length - 1] = log;
        this.onAddLog.next(log);
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