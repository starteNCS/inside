import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-raycast',
  templateUrl: './raycast.component.html',
  styleUrls: ['./raycast.component.scss']
})
export class RaycastComponent implements OnInit {

  selectedAngle = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeSelectedAngle(changeEvent: MatSliderChange): void {
    this.selectedAngle = changeEvent.value as number;
  }

}
