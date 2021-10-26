import { Component, OnInit } from '@angular/core';
import { Algorithm } from 'src/app/models/enums/algorithm.enum';

@Component({
  selector: 'app-winding-number',
  templateUrl: './winding-number.component.html',
  styleUrls: ['./winding-number.component.scss']
})
export class WindingNumberComponent {

  algorithm = Algorithm;

  constructor() { }

}
