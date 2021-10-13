import { PointModel } from "./point.model";
import { VertexModel } from "./vertex.model";

export class PresetPolygonModel {
    constructor(
        public id: string,
        public name: string,
        public vertices: VertexModel[],
        public point: PointModel | undefined) { }
}