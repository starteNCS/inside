import { Injectable } from "@angular/core";
import { PointModel } from "../models/point.model";
import { VertexModel } from "../models/vertex.model";
import { VectorRay } from "../pip/vector/vector-ray";
import { DebuggerStateService } from "./debugger-state.service";
import { DebuggerService } from "./debugger.service";
import { PointService } from "./point.service";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class RenderService {

    private cannotDrawError = 'Cannot draw when renderService is not set up';

    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private initialized: boolean;

    constructor(
        private readonly state: StateService,
        private readonly debuggerService: DebuggerService,
        private readonly debuggerState: DebuggerStateService) { }

    public init(
        canvasContext: CanvasRenderingContext2D,
        width: number,
        height: number
    ): void {
        this.context = canvasContext;
        this.width = width;
        this.height = height;

        this.state.redrawRequest.subscribe(() => this.redraw());

        this.initialized = true;
    }

    public redraw(): void {
        const t1 = performance.now();
        this.context.clearRect(0, 0, this.width, this.height);

        const vertices = this.state.getPolygon()?.vertices ?? [];
        vertices.forEach(vertex => {
            if (vertices.length > 1) {
                const vertexPosition = vertex.positionInPolygon - 1;
                this.drawEdge(
                    vertices.find(v => v.positionInPolygon === (vertexPosition < 0 ? vertices.length - 1 : vertexPosition))!,
                    vertex
                );
            }
        });
        vertices.forEach(vertex => this.drawVertex(vertex));

        const point = this.state.getPoint();
        if (point) {
            this.drawPoint(point);
        }

        const ray = this.state.getRay();
        if (ray) {
            this.drawRay(ray);
        }

        const intersections = this.state.getIntersections();
        intersections.forEach(intersection => this.drawIntersection(intersection));
        const t2 = performance.now();
        this.debuggerState.setRedrawTime(t2 - t1);
    }

    public drawRay(ray: VectorRay): void {
        if (!this.initialized) {
            this.debuggerService.logError(this.cannotDrawError);
            return;
        }

        this.context.beginPath();
        this.context.moveTo(ray.location.X, ray.location.Y);
        this.context.lineTo(ray.location.X + 10000 * ray.dirction.X, ray.location.Y + 10000 * ray.dirction.Y);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'white';
        this.context.stroke();
    }

    public drawPoint(point: PointModel): void {
        if (!this.initialized) {
            this.debuggerService.logError(this.cannotDrawError);
            return;
        }

        this.context.beginPath();
        this.context.arc(point.X, point.Y, 10, 0, 2 * Math.PI);
        this.context.fillStyle = 'green';
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'white';
        this.context.stroke();
    }

    public drawVertex(vertex: VertexModel): void {
        if (!this.initialized) {
            this.debuggerService.logError(this.cannotDrawError);
            return;
        }

        this.context.beginPath();
        this.context.arc(vertex.X, vertex.Y, 10, 0, 2 * Math.PI);
        this.context.fillStyle = 'red';
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'white';
        this.context.stroke();
    }

    public drawIntersection(point: PointModel): void {
        if (!this.initialized) {
            this.debuggerService.logError(this.cannotDrawError);
            return;
        }

        const pathLength = 5;
        this.context.beginPath();
        this.context.moveTo(point.X - pathLength, point.Y - pathLength);
        this.context.lineTo(point.X + pathLength, point.Y + pathLength);

        this.context.moveTo(point.X - pathLength, point.Y + pathLength);
        this.context.lineTo(point.X + pathLength, point.Y - pathLength);

        this.context.lineWidth = 5;
        this.context.strokeStyle = 'lime';
        this.context.stroke();
    }

    public drawEdge(fromVertex: VertexModel, toVertex: VertexModel): void {
        if (!this.initialized) {
            this.debuggerService.logError(this.cannotDrawError);
            return;
        }

        this.context.beginPath();
        this.context.moveTo(fromVertex.X, fromVertex.Y);
        this.context.lineTo(toVertex.X, toVertex.Y);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'white';
        this.context.stroke();
    }

}