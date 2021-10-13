import { Component } from '@angular/core';
import { PageComponent } from './components/page/page.component';
import { InPolygonResult } from './models/enums/in-polygon-result.enum';
import { RaycastAlgorithm } from './pip/raycast.algorithm';
import { PresetPolygonService } from './services/preset-polygon.service';
import { RenderService } from './services/render.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    state: StateService,
    renderService: RenderService,
    raycastAlgorithm: RaycastAlgorithm,
    private readonly presetPolygonService: PresetPolygonService,
    private readonly stateService: StateService
  ) {
    state.redrawRequest.subscribe(() => {
      if (state.canCalculate()) {
        state.clearIntersections();
        const result = raycastAlgorithm.isPointInPolygon();

        state.isInPolygonRaycast = result.pointInsidePolygon ? InPolygonResult.InPolygon : InPolygonResult.NotInPolygon;
        result.intersectionPoints.forEach(intersection => {
          state.addIntersectionNoRedrawRequest(intersection);
        });

        renderService.redraw();
      }
    });
  }

  loadPolygon(event: PageComponent) {
    const polygonId = event.route.snapshot.paramMap.get('polygonid');

    if (polygonId) {
      this.presetPolygonService.loadPolygonById(polygonId);
    } else {
      this.stateService.reset();
    }
  }
}
