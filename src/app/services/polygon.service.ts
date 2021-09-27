import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { VertexModel } from "../models/vertex.model";

@Injectable({
    providedIn: 'root'
})
export class PolygonService {

    public vertices: VertexModel[] = [];
    public onAddVertex = new Subject<VertexModel>();
    public onAddEdge = new Subject<[VertexModel, VertexModel]>();

    public addVertexToPolygon(x: number, y: number): void {
        const vertex = { X: x, Y: y, position: this.vertices.length };
        this.onAddVertex.next(vertex);
        this.vertices.push(vertex);

        if (this.vertices.length > 1) {
            this.onAddEdge.next([
                this.vertices.find(v => v.position === vertex.position - 1)!,
                vertex
            ])
        }
    }

}