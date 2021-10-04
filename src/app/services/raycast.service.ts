import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Vector2 } from "../pip/vector/vector";
import { VectorRay } from "../pip/vector/vector-ray";
import { DebuggerService } from "./debugger.service";
import { PointService } from "./point.service";

@Injectable({
    providedIn: 'root'
})
export class RaycastService {
    private angleSubject = new Subject<number>();
    private vectorRaySubject = new Subject<VectorRay>();

    public angle: Observable<number>;
    public vectorRay: Observable<VectorRay>;

    public currentVectorRay: VectorRay;

    constructor(
        private readonly pointService: PointService,
        private readonly debuggerService: DebuggerService) {
        this.angle = this.angleSubject.asObservable();
        this.vectorRay = this.vectorRaySubject.asObservable();
    }

    public changeAngle(angle: number): void {
        const radiants = ((angle % 360) * (Math.PI / 180)) - Math.PI;
        console.log(radiants);
        this.angleSubject.next(angle % 360);

        this.vectorRaySubject.next(this.calculateVectorRay(radiants));
    }

    private calculateVectorRay(radiants: number): VectorRay | undefined {
        const point = this.pointService.currentPoint;
        if (!point) {
            this.debuggerService.logError('You need to set a point first to change the angle');
            return undefined;
        }

        const location = new Vector2(point.X, point.Y);
        const direction = new Vector2(Math.cos(radiants), Math.sin(radiants));

        this.currentVectorRay = new VectorRay(location, direction);
        return this.currentVectorRay;
    }
}