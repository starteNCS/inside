import { Component, Input } from '@angular/core';
import { Algorithm } from 'src/app/models/enums/algorithm.enum';
import { InPolygonResult } from 'src/app/models/enums/in-polygon-result.enum';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-in-polygon',
  templateUrl: './in-polygon.component.html',
  styleUrls: ['./in-polygon.component.scss']
})
export class InPolygonComponent {

  inPolygonResult = InPolygonResult;

  @Input() algorithm: Algorithm;

  constructor(public state: StateService) { }

  isPointInPolygon(): InPolygonResult {
    return this.state.isPointInPolygon.get(this.algorithm) ?? InPolygonResult.NotCalculated;
  }

}
