import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Algorithm } from "../models/enums/algorithm.enum";
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

    public currentAlgorithm = Algorithm.WindingNumber;
    public isInPolygonRaycast = InPolygonResult.NotCalculated;

    private redrawRequestSubject = new Subject<void>();
    public redrawRequest: Observable<void>;

    constructor() {
        this.redrawRequest = this.redrawRequestSubject.asObservable();
    }

    public requestRedraw(): void {
        this.redrawRequestSubject.next();
    }

    public reset() {
        this.polygon = undefined;
        this.point = undefined;
        this.ray = undefined;
        this.intersections = [];
        this.isInPolygonRaycast = InPolygonResult.NotCalculated;
        this.redrawRequestSubject.next();
    }

    public adjustPositionsToScreensize(ratio: number): void {
        this.polygon?.vertices.forEach(vertex => {
            vertex.X *= ratio;
            vertex.Y *= ratio;
        });

        if (this.point) {
            this.point.X *= ratio;
            this.point.Y *= ratio;
        }

        if (this.ray) {
            this.ray.location.X *= ratio;
            this.ray.location.Y *= ratio;

            this.ray.direction.X *= ratio;
            this.ray.direction.Y *= ratio;
        }

        this.intersections.forEach(point => {
            point.X *= ratio;
            point.Y *= ratio;
        })
    }

    public canCalculate(): boolean {
        if (!this.polygon) {
            return false;
        }

        return this.polygon.vertices.length > 2 && this.point !== undefined;
    }

    public setPolygonNoRedrawRequest(polygon: PolygonModel): void {
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

    public setPointNoRedrawRequest(point: PointModel): void {
        this.point = point;
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

    public setAlgorithm(algorithm: Algorithm): void {
        this.currentAlgorithm = algorithm;
        console.log(this.currentAlgorithm)
        this.redrawRequestSubject.next();
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

    public getAlgorithm(): Algorithm {
        return this.currentAlgorithm;
    }
}