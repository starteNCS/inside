import { XY } from "src/app/models/XY.model";
import { Vector2 } from "src/app/pip/vector/vector";

export function toVector(point: XY): Vector2 {
    return new Vector2(point.X, point.Y);
}

