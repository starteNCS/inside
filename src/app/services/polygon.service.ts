import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { VertexModel } from "../models/vertex.model";
import { DebuggerService } from "./debugger.service";

@Injectable({
    providedIn: 'root'
})
export class PolygonService {

    public vertices: VertexModel[] = [];
    public onAddVertex = new Subject<VertexModel>();
    public onAddEdge = new Subject<[VertexModel, VertexModel]>();

    constructor(private readonly debuggerService: DebuggerService) { }

    public addVertexToPolygon(x: number, y: number): void {
        const vertex = { X: x, Y: y, position: this.vertices.length };
        this.onAddVertex.next(vertex);
        this.vertices.push(vertex);

        if (this.vertices.length > 1) {
            this.onAddEdge.next([
                this.vertices.find(v => v.position === vertex.position - 1)!,
                vertex
            ]);
            this.debuggerService.logInfo(`Added Vertex: (${x}, ${y}) with connection to ${vertex.position - 1}`);
            return;
        }
        this.debuggerService.logInfo(`Added Vertex: (${x}, ${y})`);
    }

}