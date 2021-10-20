import { Injectable } from "@angular/core";
import { Algorithm } from "../models/enums/algorithm.enum";

@Injectable({
    providedIn: 'root'
})
export class DebuggerStateService {

    private toVectorRaysTimes: number[] = [];
    private algorithmTimes = new Map<Algorithm, number[]>();
    private redrawTimes: number[] = [];

    averageToVectorRaysTime: number = 0;
    averageAlgorithmTime = new Map<Algorithm, number>();
    averageRedrawTime: number = 0;

    latestToVectorRaysTime: number = 0;
    latestAlgorithmTime = new Map<Algorithm, number>();
    latestRedrawTime: number = 0;

    setToVectorRaysTime(time: number): void {
        this.toVectorRaysTimes.push(time);
        this.averageToVectorRaysTime = this.toVectorRaysTimes.reduce((sum, n) => sum + n, 0) / this.toVectorRaysTimes.length;
        this.latestToVectorRaysTime = time;
    }

    setAlgorithmTime(algortihm: Algorithm, time: number): void {
        if (!this.algorithmTimes.get(algortihm)) {
            this.algorithmTimes.set(algortihm, []);
        }

        const algorthmTime = this.algorithmTimes.get(algortihm)!;
        this.algorithmTimes.get(algortihm)?.push(time);
        this.averageAlgorithmTime.set(algortihm, algorthmTime.reduce((sum, n) => sum + n, 0) / algorthmTime.length);
        this.latestAlgorithmTime.set(algortihm, time);
    }

    setRedrawTime(time: number): void {
        this.redrawTimes.push(time);
        this.averageRedrawTime = this.redrawTimes.reduce((sum, n) => sum + n, 0) / this.redrawTimes.length;
        this.latestRedrawTime = time;
    }

}