import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PointModel } from "../models/point.model";
import { DebuggerService } from "./debugger.service";
import { RaycastService } from "./raycast.service";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class PointService {

    constructor(
        private readonly state: StateService,
        private readonly debuggerService: DebuggerService,
        private readonly raycastService: RaycastService) {
    }

    public changePoint(X: number, Y: number): void {
        this.state.setPoint({ X, Y });
        this.raycastService.changeAngle(0);
    }
}