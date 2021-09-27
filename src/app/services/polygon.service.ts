import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { PointModel as VertexModel } from "../models/vertex.model";

@Injectable({
    providedIn: 'root'
})
export class PolygonService {

    public vertices: VertexModel[] = [];
    public onAddVertex = new Subject<VertexModel>();

    public addVertexToPolygon(x: number, y: number): void {
        const vertex = { X: x, Y: y, position: this.vertices.length };
        this.onAddVertex.next(vertex);
        this.vertices.push(vertex);
    }

}