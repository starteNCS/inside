import { Injectable } from "@angular/core";
import { PolygonModel } from "../models/polygon.model";
import { VertexModel } from "../models/vertex.model";
import { PRESET_POLYGONS, PRESET_POLYGONS_MAX_VALUE } from "../constants/polygon-map";
import { DebuggerService } from "./debugger.service";
import { filter, first, map, retryWhen, skipWhile } from "rxjs/operators";
import { RenderService } from "./render.service";
import { StateService } from "./state.service";
import { PointModel } from "../models/point.model";

@Injectable({
    providedIn: 'root'
})
export class PresetPolygonService {

    private currentMultiplicator: number;
    private currentSpcaingX: number;

    constructor(
        private readonly state: StateService,
        private readonly debuggerService: DebuggerService,
        private readonly renderService: RenderService
    ) { }

    public loadPolygonById(polygonId: string): void {
        const selectedPolygon = PRESET_POLYGONS.get(polygonId);

        if (!selectedPolygon) {
            this.debuggerService.logError('The selected Polygon does not exist');
            return;
        }

        if (!this.renderService.isInitialized()) {
            this.renderService.ready.pipe(
                skipWhile(ready => !ready),
            ).subscribe(() => {
                this.drawPolygon(selectedPolygon.name, selectedPolygon.vertices, selectedPolygon.point);
            });
            return;
        }
        this.drawPolygon(selectedPolygon.name, selectedPolygon.vertices, selectedPolygon.point);
    }

    private drawPolygon(name: string, vertices: VertexModel[], point?: PointModel): void {
        vertices = vertices.sort((a, b) => a.positionInPolygon - b.positionInPolygon);

        this.getCoordinateMultiplicator();
        this.getSpacingX();
        let polygon: PolygonModel = { name, isComplete: true, vertices: [] };
        vertices.forEach(vertex =>
            polygon.vertices.push({ ...vertex, X: this.toScreenX(vertex.X), Y: this.toScreenY(vertex.Y) }));

        // i call an redraw request once the initialization is finished in canvas.component.ts, so we should not
        // call one here. If I did I would get an ExpressionChangedAfterChecked exception for the redrawTime debug
        this.state.setPolygonNoRedrawRequest(polygon);

        if (point) {
            this.state.setPointNoRedrawRequest({ X: this.toScreenX(point.X), Y: this.toScreenY(point.Y) });
        }
    }

    private toScreenX(x: number): number {
        return (x * this.currentMultiplicator) + this.currentSpcaingX;
    }

    // since tikz begins at the bottom left and canvas at the top left side, i revert the Y Axis to unify
    // the tikz and canvas coordinates
    private toScreenY(y: number): number {
        return (PRESET_POLYGONS_MAX_VALUE - y) * this.currentMultiplicator;
    }

    private getCoordinateMultiplicator(): void {
        const size = this.renderService.getSize();

        this.currentMultiplicator = size[1] / PRESET_POLYGONS_MAX_VALUE;
    }

    private getSpacingX(): void {
        const size = this.renderService.getSize();

        this.currentSpcaingX = (size[0] - size[1]) / 2;
    }

}