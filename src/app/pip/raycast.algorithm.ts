import { Injectable } from "@angular/core";
import { PointModel } from "../models/point.model";
import { ResultModel } from "../models/result.model";
import { DebuggerStateService } from "../services/debugger-state.service";
import { DebuggerService } from "../services/debugger.service";
import { PolygonService } from "../services/polygon.service";
import { StateService } from "../services/state.service";
import { PointInPolygon } from "./point-in-polygon.interface";

@Injectable({
    providedIn: 'root'
})
export class RaycastAlgorithm implements PointInPolygon {

    constructor(
        private readonly state: StateService,
        private readonly polygonService: PolygonService,
        private readonly debuggerState: DebuggerStateService,
    ) {
    }

    public isPointInPolygon(): ResultModel {
        let intersections: PointModel[] = [];
        const vectorRays = this.polygonService.toVectorRays();
        const ray = this.state.getRay();

        if (!ray) {
            return {
                pointInsidePolygon: false,
                intersectionPoints: []
            };
        }

        const t1 = performance.now();
        vectorRays.forEach(vectorRay => {
            const multiples = ray.getMultiplesOfDirectionVectorsForIntersection(vectorRay);
            if (multiples[1] >= 0 && multiples[1] <= 1 && multiples[0] >= 0) {
                const intersection = ray.getIntersectionPoint(vectorRay)!;
                intersections.push(intersection);
            }
        });
        const t2 = performance.now();
        this.debuggerState.setAlgorithmTime(t2 - t1);

        return {
            pointInsidePolygon: intersections.length % 2 != 0,
            intersectionPoints: intersections
        };
    }

}