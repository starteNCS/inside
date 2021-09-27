import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { VertexModel } from "../models/vertex.model";
import { DebuggerService } from "./debugger.service";

@Injectable({
    providedIn: 'root'
})
export class PolygonService {

    private vertices: VertexModel[] = [];
    private onAddVertexSubject = new Subject<VertexModel>();
    private onAddEdgeSubject = new Subject<[VertexModel, VertexModel]>();

    public onAddVertex: Observable<VertexModel>;
    public onAddEdge: Observable<[VertexModel, VertexModel]>;

    constructor(private readonly debuggerService: DebuggerService) {
        this.onAddVertex = this.onAddVertexSubject.asObservable();
        this.onAddEdge = this.onAddEdgeSubject.asObservable();
    }

    public addVertexToPolygon(x: number, y: number): void {
        if (this.onAddVertexSubject.isStopped || this.onAddEdgeSubject.isStopped) {
            this.debuggerService.logWarning('Polygon is already completed. Please refresh to start over');
            return;
        }
        const vertex = { X: x, Y: y, position: this.vertices.length };
        this.onAddVertexSubject.next(vertex);
        this.vertices.push(vertex);

        if (this.vertices.length > 1) {
            this.onAddEdgeSubject.next([
                this.vertices.find(v => v.position === vertex.position - 1)!,
                vertex
            ]);
            this.debuggerService.logInfo(`Added Vertex: (${x}, ${y}) with connection to ${vertex.position - 1}`);
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

}