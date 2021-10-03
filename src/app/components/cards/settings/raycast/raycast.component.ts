import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { RaycastService } from 'src/app/services/raycast.service';

@Component({
  selector: 'app-raycast',
  templateUrl: './raycast.component.html',
  styleUrls: ['./raycast.component.scss']
})
export class RaycastComponent implements OnInit {

  selectedAngle = 0;

  constructor(private readonly raycastService: RaycastService) { }

  ngOnInit(): void {
  }

  changeDisplaySelectedAngle(changeEvent: MatSliderChange): void {
    this.selectedAngle = changeEvent.value as number;
  }

  changeSelectedAngle(changeEvent: MatSliderChange): void {
    this.raycastService.changeAngle(changeEvent.value as number);
  }

}
