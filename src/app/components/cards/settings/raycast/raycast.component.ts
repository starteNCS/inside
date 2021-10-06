import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { InPolygonResult } from 'src/app/models/enums/in-polygon-result.enum';
import { RaycastService } from 'src/app/services/raycast.service';
import { RenderService } from 'src/app/services/render.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-raycast',
  templateUrl: './raycast.component.html',
  styleUrls: ['./raycast.component.scss']
})
export class RaycastComponent {

  selectedAngle = 0;

  inPolygonResult = InPolygonResult;

  constructor(
    public state: StateService,
    private readonly raycastService: RaycastService,
    private readonly renderService: RenderService) { }

  changeDisplaySelectedAngle(changeEvent: MatSliderChange): void {
    this.renderService.redraw();
    this.raycastService.changeAngle(changeEvent.value as number);
    this.selectedAngle = changeEvent.value as number;
  }

}
