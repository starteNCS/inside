import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Vector2 } from "../pip/vector/vector";
import { VectorRay } from "../pip/vector/vector-ray";
import { DebuggerService } from "./debugger.service";
import { PointService } from "./point.service";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class RaycastService {
    private angleSubject = new Subject<number>();
    public angle: Observable<number>;

    constructor(
        private readonly state: StateService,
        private readonly debuggerService: DebuggerService) {
        this.angle = this.angleSubject.asObservable();
    }

    public changeAngle(angle: number): void {
        // i want the ray to point towards the right
        angle = angle + 180;
        const radiants = ((angle % 360) * (Math.PI / 180)) - Math.PI;
        this.angleSubject.next(angle % 360);

        const ray = this.calculateVectorRay(radiants);
        if (ray) {
            this.state.setRay(ray);
        }
    }

    private calculateVectorRay(radiants: number): VectorRay | undefined {
        const point = this.state.getPoint();
        if (!point) {
            this.debuggerService.logError('You need to set a point first to change the angle');
            return undefined;
        }

        const location = new Vector2(point.X, point.Y);
        const direction = new Vector2(Math.cos(radiants), Math.sin(radiants));

        return new VectorRay(location, direction);
    }
}