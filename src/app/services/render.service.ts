import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Algorithm } from "../models/enums/algorithm.enum";
import { PointModel } from "../models/point.model";
import { VertexModel } from "../models/vertex.model";
import { Vector2 } from "../pip/vector/vector";
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
    private redrawRequestedInInitialization: boolean;

    private readySubject = new BehaviorSubject<boolean>(false);
    public ready: Observable<boolean>;

    constructor(
        private readonly state: StateService,
        private readonly debuggerService: DebuggerService,
        private readonly debuggerState: DebuggerStateService
    ) {
        this.ready = this.readySubject.asObservable();
    }

    public initWidthSize(
        canvasContext: CanvasRenderingContext2D,
        width: number,
        height: number
    ): void {
        this.updateSize(width, height);
        this.init(canvasContext);
    }

    public init(canvasContext: CanvasRenderingContext2D): void {
        this.context = canvasContext;
        this.state.redrawRequest.subscribe(() => this.redraw());
        this.initialized = true;
        if (this.width && this.height) {
            this.readySubject.next(true);
            this.readySubject.complete();
        }
        if (this.redrawRequestedInInitialization) {
            this.redraw();
        }
    }

    public updateSize(width: number, height: number): void {
        let ratio = 1;
        if (this.width && this.height) {
            ratio = width / this.width;
        }

        this.width = width;
        this.height = height;
        this.state.adjustPositionsToScreensize(ratio);

        if (!this.readySubject.closed) {
            this.readySubject.next(true);
            this.readySubject.complete();
        }
    }

    public redraw(): void {
        if (!this.initialized) {
            this.redrawRequestedInInitialization = true;
            return;
        }

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
        const maxPosition = vertices.reduce((o, n) => n.positionInPolygon > o ? n.positionInPolygon : o, 0);
        vertices.forEach(vertex => {
            this.drawVertex(vertex, vertex.positionInPolygon == maxPosition);
        });

        const point = this.state.getPoint();
        if (point) {
            this.drawPoint(point);
        }

        if (this.state.currentAlgorithm === Algorithm.Raycast) {
            const ray = this.state.getRay();
            if (ray) {
                this.drawRay(ray);
            }
        }

        if (this.state.currentAlgorithm === Algorithm.NonZero && point) {
            const ray = new VectorRay(new Vector2(point?.X, point.Y), new Vector2(1, 0));
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
        this.context.lineTo(ray.location.X + 10000 * ray.direction.X, ray.location.Y + 10000 * ray.direction.Y);
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

    public drawVertex(vertex: VertexModel, isLast: boolean = false): void {
        if (!this.initialized) {
            this.debuggerService.logError(this.cannotDrawError);
            return;
        }

        this.context.beginPath();
        this.context.arc(vertex.X, vertex.Y, 10, 0, 2 * Math.PI);
        this.context.fillStyle = !isLast ? 'red' : 'orange';
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

        if (point.text && this.state.getDisplayDebugger()) {
            this.context.font = '20px Arial';
            this.context.fillText(point.text, point.X + 10, point.Y + 15);
        }
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

    public getSize(): [width: number, height: number] {
        return [this.width, this.height];
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

}