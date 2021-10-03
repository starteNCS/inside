import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PointModel } from "../models/point.model";
import { VertexModel } from "../models/vertex.model";
import { Vector2 } from "../pip/vector/vector";
import { VectorRay } from "../pip/vector/vector-ray";
import { DebuggerService } from "./debugger.service";

@Injectable({
    providedIn: 'root'
})
export class PolygonService {

    private vertices: VertexModel[] = [];
    private onAddVertexSubject = new Subject<VertexModel>();
    private onAddEdgeSubject = new Subject<[VertexModel, VertexModel]>();
    private onAddIntersectionSubject = new Subject<PointModel>();

    public onAddVertex: Observable<VertexModel>;
    public onAddEdge: Observable<[VertexModel, VertexModel]>;
    public onAddIntersection: Observable<PointModel>;

    constructor(private readonly debuggerService: DebuggerService) {
        this.onAddVertex = this.onAddVertexSubject.asObservable();
        this.onAddEdge = this.onAddEdgeSubject.asObservable();
        this.onAddIntersection = this.onAddIntersectionSubject.asObservable();
    }

    public addVertexToPolygon(x: number, y: number): void {
        if (this.onAddVertexSubject.isStopped || this.onAddEdgeSubject.isStopped) {
            this.debuggerService.logWarning('Polygon is already completed. Please refresh to start over');
            return;
        }
        const vertex = { X: x, Y: y, positionInPolygon: this.vertices.length };
        this.onAddVertexSubject.next(vertex);
        this.vertices.push(vertex);

        if (this.vertices.length > 1) {
            this.onAddEdgeSubject.next([
                this.vertices.find(v => v.positionInPolygon === vertex.positionInPolygon - 1)!,
                vertex
            ]);
            this.debuggerService.logInfo(`Added Vertex: (${x}, ${y}) with connection to ${vertex.positionInPolygon - 1}`);
            return;
        }
        this.debuggerService.logInfo(`Added Vertex: (${x}, ${y})`);
    }

    public finishPolygon(): void {
        if (this.onAddVertexSubject.isStopped || this.onAddEdgeSubject.isStopped) {
            this.debuggerService.logWarning('Polygon is already completed. Please refresh to start over');
            return;
        }

        if (this.vertices.length < 3) {
            this.debuggerService.logWarning('Cannot complete a polygon with only two or less vertices');
            return;
        }

        this.onAddEdgeSubject.next([
            this.vertices[0],
            this.vertices[this.vertices.length - 1]
        ]);
        this.debuggerService.logInfo('Polygon completed');
        this.onAddVertexSubject.complete();
        this.onAddEdgeSubject.complete();
    }

    public addIntersection(point: PointModel): void {
        this.onAddIntersectionSubject.next(point);
    }

    public toVectorRays(): VectorRay[] {
        if (!this.onAddVertexSubject.isStopped || !this.onAddEdgeSubject.isStopped) {
            this.debuggerService.logError('Cannot get VectorRays when polygon is not finished');
            return [];
        }

        const vectorRays: VectorRay[] = [];
        let previous: VertexModel;
        this.vertices.sort((a, b) => a.positionInPolygon - b.positionInPolygon).forEach(vertex => {
            if (!previous) {
                previous = this.vertices[this.vertices.length - 1];
            }

            const location = new Vector2(previous.X, previous.Y);
            const direction = new Vector2(vertex.X - previous.X, vertex.Y - previous.Y);

            vectorRays.push(new VectorRay(location, direction));
            previous = vertex;
        });

        return vectorRays;
    }

}