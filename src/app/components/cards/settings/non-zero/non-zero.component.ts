import { Component, OnInit } from '@angular/core';
import { Algorithm } from 'src/app/models/enums/algorithm.enum';

@Component({
  selector: 'app-non-zero',
  templateUrl: './non-zero.component.html',
  styleUrls: ['./non-zero.component.scss']
})
export class NonZeroComponent {

  algorithm = Algorithm;

  constructor() { }

}
