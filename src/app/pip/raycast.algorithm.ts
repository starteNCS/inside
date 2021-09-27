import { Injectable } from "@angular/core";
import { PointModel } from "../models/point.model";
import { DebuggerService } from "../services/debugger.service";
import { PolygonService } from "../services/polygon.service";
import { PointInPolygon } from "./point-in-polygon.interface";
import { Vector2 } from "./vector/vector";
import { VectorRay } from "./vector/vector-ray";

@Injectable({
    providedIn: 'root'
})
export class RaycastAlgorithm implements PointInPolygon {

    constructor(
        private readonly polygonService: PolygonService,
        private readonly debuggerService: DebuggerService) { }

    public isPointInPolygon(point: PointModel): boolean {
        let intersections = 0;
        const vectorRays = this.polygonService.toVectorRays();
        const ray = new VectorRay(new Vector2(point.X, point.Y), new Vector2(1, 0));

        vectorRays.forEach(vectorRay => {
            const multiples = ray.getMultiplesOfDirectionVectorsForIntersection(vectorRay);
            if (multiples[1] >= 0 && multiples[1] <= 1) {
                intersections += 1;
                const intersection = ray.getIntersectionPoint(vectorRay)!;
                this.polygonService.addIntersection({
                    X: intersection.X,
                    Y: intersection.Y
                });
            }
        });

        this.debuggerService.logInfo(`Raycasting Algorithm found ${intersections} intersections.`)
        return intersections % 2 != 0;
    }

}