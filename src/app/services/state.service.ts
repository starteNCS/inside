import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { InPolygonResult } from "../models/enums/in-polygon-result.enum";
import { PointModel } from "../models/point.model";
import { PolygonModel } from "../models/polygon.model";
import { VertexModel } from "../models/vertex.model";
import { VectorRay } from "../pip/vector/vector-ray";

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private polygon: PolygonModel | undefined;
    private point: PointModel | undefined;
    private ray: VectorRay | undefined;
    private intersections: PointModel[] = [];

    public isInPolygonRaycast = InPolygonResult.NotCalculated;

    private redrawRequestSubject = new Subject<void>();
    public redrawRequest: Observable<void>;

    constructor() {
        this.redrawRequest = this.redrawRequestSubject.asObservable();
    }

    public setPolygon(polygon: PolygonModel): void {
        this.polygon = polygon;
    }

    public addVertexToPolygon(vertex: VertexModel): void {
        if (!this.polygon) {
            this.polygon = { name: 'UserCreated', vertices: [], isComplete: false };
        }
        const vertices = [...this.polygon.vertices, vertex];
        this.polygon = { ...this.polygon, vertices, isComplete: vertices.length >= 3 };
        this.redrawRequestSubject.next();
    }

    public setPoint(point: PointModel): void {
        this.point = point;
        this.redrawRequestSubject.next();
    }

    public setRay(ray: VectorRay): void {
        this.ray = ray;
        this.redrawRequestSubject.next();
    }

    public addIntersection(intersection: PointModel): void {
        this.addIntersectionNoRedrawRequest(intersection);
        this.redrawRequestSubject.next();
    }

    public addIntersectionNoRedrawRequest(intersection: PointModel): void {
        this.intersections.push(intersection);
    }

    public clearIntersections(): void {
        this.intersections = [];
    }

    public getPolygon(): PolygonModel {
        return this.polygon ?? { name: 'UserCreated', vertices: [], isComplete: false };
    }

    public getPoint(): PointModel | undefined {
        return this.point;
    }

    public getRay(): VectorRay | undefined {
        return this.ray;
    }

    public getIntersections(): PointModel[] {
        return this.intersections;
    }
}