import { VertexModel } from "./vertex.model";

export interface PolygonModel {
    name: string;
    isComplete: boolean;
    vertices: VertexModel[];
}