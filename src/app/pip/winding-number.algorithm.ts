import { Injectable } from "@angular/core";
import { Algorithm } from "../models/enums/algorithm.enum";
import { ResultModel } from "../models/result.model";
import { DebuggerStateService } from "../services/debugger-state.service";
import { StateService } from "../services/state.service";
import { pairwise } from "../services/utils/pairwise";
import { toVector } from "../services/utils/to-vector";
import { PointInPolygon } from "./point-in-polygon.interface";

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

            let angle = Math.atan2(currpoint.X * nextpoint.Y - currpoint.Y * nextpoint.X, currpoint.X * nextpoint.X + currpoint.Y * nextpoint.Y);

            windingNumber += angle;

        });

        const t2 = performance.now();
        this.debuggerState.setAlgorithmTime(Algorithm.WindingNumber, t2 - t1);

        const pointInsidePolygon = windingNumber > 0.05 || windingNumber < -0.05;
        const becauseText = `The WindingNumber is ${Math.round(windingNumber / Math.PI)}PI (${windingNumber / Math.PI})`;

        return {
            intersectionPoints: [],
            pointInsidePolygon,
            becauseText
        };
    }

}