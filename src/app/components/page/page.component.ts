import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresetPolygonService } from 'src/app/services/preset-polygon.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly presetPolygonService: PresetPolygonService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      const polygonId = map.get('polygonId');
      if (polygonId) {
        this.presetPolygonService.loadPolygonById(polygonId);
      }
    });
  }

}
