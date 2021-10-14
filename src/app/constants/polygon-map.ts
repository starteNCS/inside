import { PresetPolygonModel } from "../models/preset-polygon.model";

export const PRESET_POLYGONS_MAX_VALUE = 10;

// the vertices are given in a 10x10 field and later translated to the "real" coordinates
export const PRESET_POLYGONS = new Map<string, PresetPolygonModel>([
    [
        'square-polygon',
        new PresetPolygonModel(
            'square-polygon',
            'Quadrat',
            [
                { X: 0, Y: 0, positionInPolygon: 0 },
                { X: 10, Y: 0, positionInPolygon: 1 },
                { X: 10, Y: 10, positionInPolygon: 2 },
                { X: 0, Y: 10, positionInPolygon: 3 },
            ],
            { X: 100, Y: 100 }
        )
    ],
    [
        'jordan-raycast-example',
        new PresetPolygonModel(
            'jordan-raycast-example',
            'Beispiel Raycasting nach Jordan',
            [
                { X: 0, Y: 0, positionInPolygon: 0 },
                { X: 2, Y: 3, positionInPolygon: 1 },
                { X: 4, Y: 1, positionInPolygon: 2 },
                { X: 7, Y: 2, positionInPolygon: 3 },
                { X: 7, Y: 6, positionInPolygon: 4 },
                { X: 3, Y: 4, positionInPolygon: 5 },
                { X: 0, Y: 6, positionInPolygon: 6 },
                { X: 1, Y: 3, positionInPolygon: 7 },
            ],
            undefined
        )
    ]
])