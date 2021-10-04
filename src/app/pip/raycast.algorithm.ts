import { Injectable } from "@angular/core";
import { PointModel } from "../models/point.model";
import { DebuggerService } from "../services/debugger.service";
import { PolygonService } from "../services/polygon.service";
import { RaycastService } from "../services/raycast.service";
import { PointInPolygon } from "./point-in-polygon.interface";

@Injectable({
    providedIn: 'root'
})
export class RaycastAlgorithm implements PointInPolygon {

    constructor(
        private readonly polygonService: PolygonService,
        private readonly raycastService: RaycastService,
        private readonly debuggerService: DebuggerService) {

    }

    public isPointInPolygon(point: PointModel): boolean {
        let intersections = 0;
        const vectorRays = this.polygonService.toVectorRays();
        const ray = this.raycastService.currentVectorRay;

        vectorRays.forEach(vectorRay => {
            const multiples = ray.getMultiplesOfDirectionVectorsForIntersection(vectorRay);
            if (multiples[1] >= 0 && multiples[1] <= 1 && multiples[0] >= 0) {
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