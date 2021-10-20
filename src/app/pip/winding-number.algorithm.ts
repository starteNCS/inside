import { Injectable } from "@angular/core";
import { Algorithm } from "../models/enums/algorithm.enum";
import { PointModel } from "../models/point.model";
import { ResultModel } from "../models/result.model";
import { DebuggerStateService } from "../services/debugger-state.service";
import { PolygonService } from "../services/polygon.service";
import { StateService } from "../services/state.service";
import { PointInPolygon } from "./point-in-polygon.interface";
import { Vector2 } from "./vector/vector";
import { VectorRay } from "./vector/vector-ray";

@Injectable({
    providedIn: 'root'
})
export class WindingNumberAlgorithm implements PointInPolygon {

    constructor(
        private readonly state: StateService,
        private readonly polygonService: PolygonService,
        private readonly debuggerState: DebuggerStateService,
    ) {
    }

    isPointInPolygon(): ResultModel | undefined {
        let intersections: PointModel[] = [];
        const vectorRays = this.polygonService.toVectorRays();
        const point = this.state.getPoint();
        let windingNumber = 0;

        if (!point) {
            return undefined;
        }

        const t1 = performance.now();
        const ray = new VectorRay(new Vector2(point.X, point.Y), new Vector2(1, 0));
        vectorRays.forEach(vectorRay => {
            const multiples = ray.getMultiplesOfDirectionVectorsForIntersection(vectorRay);
            if (multiples[1] >= 0 && multiples[1] <= 1 && multiples[0] >= 0) {
                const windingValue = vectorRay.getDirection()!;
                windingNumber += windingValue;
                const intersection = ray.getIntersectionPoint(vectorRay, multiples)!;
                intersections.push({
                    X: intersection.X,
                    Y: intersection.Y,
                    text: windingValue === 1 ? 'up' : 'down'
                });
            }
        });
        const t2 = performance.now();
        this.debuggerState.setAlgorithmTime(Algorithm.WindingNumber, t2 - t1);

        const pointInsidePolygon = windingNumber !== 0;
        const becauseText = `The winding number is ${windingNumber}. Since this number ${pointInsidePolygon ? 'is not' : 'is'} equal to zero, the point is ${pointInsidePolygon ? 'inside' : 'outside'} of the polygon.`;

        return {
            intersectionPoints: intersections,
            pointInsidePolygon,
            becauseText
        };
    }

}