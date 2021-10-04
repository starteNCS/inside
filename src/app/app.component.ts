import { Component } from '@angular/core';
import { InPolygonResult } from './models/enums/in-polygon-result.enum';
import { RaycastAlgorithm } from './pip/raycast.algorithm';
import { RenderService } from './services/render.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PIP';


  constructor(
    state: StateService,
    renderService: RenderService,
    raycastAlgorithm: RaycastAlgorithm
  ) {
    state.redrawRequest.subscribe(() => {
      state.clearIntersections();
      const result = raycastAlgorithm.isPointInPolygon();

      state.isInPolygonRaycast = result.pointInsidePolygon ? InPolygonResult.InPolygon : InPolygonResult.NotInPolygon;
      result.intersectionPoints.forEach(intersection => {
        state.addIntersectionNoRedrawRequest(intersection);
      });

      renderService.redraw();
    });
  }
}
