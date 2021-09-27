import { Component, OnInit } from '@angular/core';
import { PolygonService } from 'src/app/services/polygon.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(public polygonService: PolygonService) { }

  ngOnInit() {

  }

}
