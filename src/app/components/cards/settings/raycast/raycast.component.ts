import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { RaycastAlgorithm } from 'src/app/pip/raycast.algorithm';
import { RaycastService } from 'src/app/services/raycast.service';
import { RenderService } from 'src/app/services/render.service';

@Component({
  selector: 'app-raycast',
  templateUrl: './raycast.component.html',
  styleUrls: ['./raycast.component.scss']
})
export class RaycastComponent implements OnInit {

  selectedAngle = 0;

  constructor(
    private readonly raycastService: RaycastService,
    private readonly renderService: RenderService) { }

  ngOnInit(): void {
  }

  changeDisplaySelectedAngle(changeEvent: MatSliderChange): void {
    this.renderService.redraw();
    this.raycastService.changeAngle(changeEvent.value as number);
    this.selectedAngle = changeEvent.value as number;
  }

}
