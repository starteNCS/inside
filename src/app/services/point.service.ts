import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PointModel } from "../models/point.model";
import { DebuggerService } from "./debugger.service";

@Injectable({
    providedIn: 'root'
})
export class PointService {
    private pointSubject = new Subject<PointModel>();
    public point: Observable<PointModel>;

    constructor(private readonly debuggerService: DebuggerService) {
        this.point = this.pointSubject.asObservable();
    }

    public changePoint(X: number, Y: number): void {
        if (this.pointSubject.isStopped) {
            this.debuggerService.logWarning('Point is already set. Please refresh to start over');
            return;
        }


        this.pointSubject.next({
            X, Y
        });
        this.pointSubject.complete();
    }
}