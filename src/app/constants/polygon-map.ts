import { PresetPolygonModel } from "../models/preset-polygon.model";

export const PRESET_POLYGONS_MAX_VALUE = 10;

// the vertices are given in a 10x10 field and later translated to the "real" coordinates
export const PRESET_POLYGONS = new Map<string, PresetPolygonModel>([
    ['square-polygon', new PresetPolygonModel(
        'square-polygon',
        'Quadrat',
        [
            { X: 2, Y: 2, positionInPolygon: 0 },
            { X: 8, Y: 2, positionInPolygon: 1 },
            { X: 8, Y: 8, positionInPolygon: 2 },
            { X: 2, Y: 8, positionInPolygon: 3 },
        ],
        { X: 100, Y: 100 }
    )
    ]
])