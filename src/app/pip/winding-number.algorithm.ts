import { Injectable } from "@angular/core";
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
        })

        return {
            intersectionPoints: intersections,
            pointInsidePolygon: windingNumber !== 0
        };
    }

}