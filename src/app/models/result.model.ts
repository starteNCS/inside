import { PointModel } from "./point.model";

export interface ResultModel {
    pointInsidePolygon: boolean;
    intersectionPoints: PointModel[];
    becauseText: string;
}