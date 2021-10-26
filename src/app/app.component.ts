import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PageComponent } from './components/page/page.component';
import { Algorithm } from './models/enums/algorithm.enum';
import { InPolygonResult } from './models/enums/in-polygon-result.enum';
import { ResultModel } from './models/result.model';
import { RaycastAlgorithm } from './pip/raycast.algorithm';
import { NonZeroAlgorithm } from './pip/non-zero.algorithm';
import { PresetPolygonService } from './services/preset-polygon.service';
import { RenderService } from './services/render.service';
import { StateService } from './services/state.service';
import { WindingNumberAlgorithm } from './pip/winding-number.algorithm';

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
    nonZeroAlgorithm: NonZeroAlgorithm,
    windingNumberAlgorithm: WindingNumberAlgorithm,
    router: Router,
    private readonly presetPolygonService: PresetPolygonService,
    private readonly stateService: StateService,
  ) {
    state.redrawRequest.subscribe(() => {
      if (state.canCalculate()) {
        state.clearIntersections();
        let result: ResultModel | undefined;
        switch (state.getAlgorithm()) {
          case Algorithm.Raycast:
            result = raycastAlgorithm.isPointInPolygon();
            break;
          case Algorithm.NonZero:
            result = nonZeroAlgorithm.isPointInPolygon();
            break;
          case Algorithm.WindingNumber:
            result = windingNumberAlgorithm.isPointInPolygon();
            break;
        }

        if (!result) {
          return;
        }

        state.isPointInPolygon.set(
          state.getAlgorithm(),
          result.pointInsidePolygon ? InPolygonResult.InPolygon : InPolygonResult.NotInPolygon);
        result.intersectionPoints.forEach(intersection => {
          state.addIntersectionNoRedrawRequest(intersection);
        });
        state.setBecauseText(state.getAlgorithm(), result.becauseText);

        renderService.redraw();
      }
    });

    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const polygonId = e.urlAfterRedirects.split('/')[1];

        if (polygonId) {
          this.presetPolygonService.loadPolygonById(polygonId);
        } else {
          this.stateService.reset();
          this.presetPolygonService.performedActionsCount++;
        }
      });
  }
}
