import { PointModel } from "../models/point.model";
import { ResultModel } from "../models/result.model";

export interface PointInPolygon {
    isPointInPolygon(): ResultModel;
}
