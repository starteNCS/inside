import { PointModel } from "../models/point.model";
import { ResultModel } from "../models/result.model";

export interface PointInPolygon {
    /**
     * This methods checks if a given point (provided in state) is within the bounds of a given polygon (also saved
     * in state). It can be implemented in different algorithms.
     * @returns undefined: Something was missing, either the point or the ray
     *          ResultModel: contains wether the point is inside the polygon and all the intersections from the ray and the polgon
     */
    isPointInPolygon(): ResultModel | undefined;
}
