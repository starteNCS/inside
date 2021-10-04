import { Injectable } from "@angular/core";
import { PointModel } from "../models/point.model";
import { VertexModel } from "../models/vertex.model";
import { Vector2 } from "../pip/vector/vector";
import { VectorRay } from "../pip/vector/vector-ray";
import { DebuggerService } from "./debugger.service";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class PolygonService {

    constructor(
        private readonly state: StateService,
        private readonly debuggerService: DebuggerService
    ) {
    }

    public addVertexToPolygon(x: number, y: number): void {
        const polygon = this.state.getPolygon();
        const vertex = { X: x, Y: y, positionInPolygon: polygon.vertices.length };
        this.state.addVertexToPolygon(vertex);
        this.debuggerService.logInfo(`Added Vertex: (${x}, ${y})`);
    }

    public addIntersection(point: PointModel): void {
        this.state.addIntersection(point);
    }

    public toVectorRays(): VectorRay[] {
        if (!this.state.getPolygon()?.isComplete) {
            return [];
        }

        const polygon = this.state.getPolygon();
        const vectorRays: VectorRay[] = [];
        let previous: VertexModel;
        polygon.vertices.sort((a, b) => a.positionInPolygon - b.positionInPolygon).forEach(vertex => {
            if (!previous) {
                previous = polygon.vertices[polygon.vertices.length - 1];
            }

            const location = new Vector2(previous.X, previous.Y);
            const direction = new Vector2(vertex.X - previous.X, vertex.Y - previous.Y);

            vectorRays.push(new VectorRay(location, direction));
            previous = vertex;
        });

        return vectorRays;
    }

}