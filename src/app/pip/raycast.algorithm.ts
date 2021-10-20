import { Injectable } from "@angular/core";
import { Algorithm } from "../models/enums/algorithm.enum";
import { PointModel } from "../models/point.model";
import { ResultModel } from "../models/result.model";
import { DebuggerStateService } from "../services/debugger-state.service";
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

    public isPointInPolygon(): ResultModel | undefined {
        let intersections: PointModel[] = [];
        const vectorRays = this.polygonService.toVectorRays();
        const ray = this.state.getRay();
        const point = this.state.getPoint();

        if (!ray || !point) {
            return undefined;
        }

        const t1 = performance.now();
        vectorRays.forEach(vectorRay => {
            const multiples = ray.getMultiplesOfDirectionVectorsForIntersection(vectorRay);
            if (multiples[1] >= 0 && multiples[1] <= 1 && multiples[0] >= 0) {
                const intersection = ray.getIntersectionPoint(vectorRay, multiples)!;
                intersections.push({
                    X: intersection.X,
                    Y: intersection.Y,
                    text: (intersections.length + 1).toString()
                });
            }
        });
        const t2 = performance.now();
        this.debuggerState.setAlgorithmTime(Algorithm.Raycast, t2 - t1);

        const intersectionCount = intersections.length;
        const pointInsidePolygon = intersectionCount % 2 != 0;
        const becauseText = `Ray intersected polygon ${intersectionCount} time${intersectionCount > 1 ? 's' : ''}. Since this is a ${pointInsidePolygon ? 'odd' : 'even'} number, the point is ${pointInsidePolygon ? 'inside' : 'outside'} the polygon.`;

        return {
            pointInsidePolygon,
            becauseText,
            intersectionPoints: intersections
        };
    }

}