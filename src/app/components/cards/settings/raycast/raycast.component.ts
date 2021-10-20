import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Algorithm } from 'src/app/models/enums/algorithm.enum';
import { RaycastService } from 'src/app/services/raycast.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-raycast',
  templateUrl: './raycast.component.html',
  styleUrls: ['./raycast.component.scss']
})
export class RaycastComponent {

  selectedAngle = 0;

  algorithm = Algorithm;

  constructor(
    public state: StateService,
    private readonly raycastService: RaycastService
  ) { }

  changeDisplaySelectedAngle(changeEvent: MatSliderChange): void {
    this.raycastService.changeAngle(changeEvent.value as number);
    this.selectedAngle = changeEvent.value as number;
  }

}
