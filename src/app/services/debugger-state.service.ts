import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DebuggerStateService {

    private toVectorRaysTimes: number[] = [];
    private algorithmTimes: number[] = [];
    private redrawTimes: number[] = [];

    averageToVectorRaysTime: number = 0;
    averageAlgorithmTime: number = 0;
    averageRedrawTime: number = 0;

    latestToVectorRaysTime: number = 0;
    latestAlgorithmTime: number = 0;
    latestRedrawTime: number = 0;

    setToVectorRaysTime(time: number): void {
        this.toVectorRaysTimes.push(time);
        this.averageToVectorRaysTime = this.toVectorRaysTimes.reduce((sum, n) => sum + n, 0) / this.toVectorRaysTimes.length;
        this.latestToVectorRaysTime = time;
    }

    setAlgorithmTime(time: number): void {
        this.algorithmTimes.push(time);
        this.averageAlgorithmTime = this.algorithmTimes.reduce((sum, n) => sum + n, 0) / this.algorithmTimes.length;
        this.latestAlgorithmTime = time;
    }

    setRedrawTime(time: number): void {
        this.redrawTimes.push(time);
        this.averageRedrawTime = this.redrawTimes.reduce((sum, n) => sum + n, 0) / this.redrawTimes.length;
        this.latestRedrawTime = time;
    }

}