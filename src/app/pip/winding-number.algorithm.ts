import { CurrencyPipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Algorithm } from "../models/enums/algorithm.enum";
import { ResultModel } from "../models/result.model";
import { VertexModel } from "../models/vertex.model";
import { DebuggerStateService } from "../services/debugger-state.service";
import { PolygonService } from "../services/polygon.service";
import { StateService } from "../services/state.service";
import { pairwise } from "../services/utils/pairwise";
import { toVector } from "../services/utils/to-vector";
import { PointInPolygon } from "./point-in-polygon.interface";
import { Vector2 } from "./vector/vector";

@Injectable({
    providedIn: 'root'
})
export class WindingNumberAlgorithm implements PointInPolygon {

    constructor(
        private readonly state: StateService,
        private readonly debuggerState: DebuggerStateService
    ) { }

    isPointInPolygon(): ResultModel | undefined {
        const vertices = this.state.getPolygon().vertices;
        const point = this.state.getPoint();
        let windingNumber = 0;

        if (!point) {
            return undefined;
        }
        const pointVec = toVector(point);

        const t1 = performance.now();
        console.clear()

        pairwise(vertices, (curr, next) => {
            const currpoint = pointVec.subtract(toVector(curr));
            const nextpoint = pointVec.subtract(toVector(next));
            let angle = Math.acos(currpoint.dotProduct(nextpoint) / (currpoint.norm() * nextpoint.norm()));
            // windingNumber += curr.Y >= next.Y ? angle : -angle;
            windingNumber += angle;
            console.log(angle * (180 / Math.PI))
        });

        const t2 = performance.now();
        this.debuggerState.setAlgorithmTime(Algorithm.WindingNumber, t2 - t1);

        const pointInsidePolygon = windingNumber !== 0;
        const becauseText = `The WindingNumber is ${windingNumber / Math.PI}PI`;

        return {
            intersectionPoints: [],
            pointInsidePolygon,
            becauseText
        };
    }

}