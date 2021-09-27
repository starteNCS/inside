import { PointModel } from "../models/point.model";

export interface PointInPolygon {
    isPointInPolygon(point: PointModel): boolean;
}
