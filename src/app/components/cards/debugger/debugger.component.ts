import { Component, OnInit } from '@angular/core';
import { LogLevel } from 'src/app/models/enums/log-level.enum';
import { PolygonModel } from 'src/app/models/polygon.model';
import { DebuggerStateService } from 'src/app/services/debugger-state.service';
import { DebuggerService } from 'src/app/services/debugger.service';
import { PolygonService } from 'src/app/services/polygon.service';

@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss']
})
export class DebuggerComponent implements OnInit {

  public LogLevel = LogLevel;

  logsShown = false;

  selected: PolygonModel;
  polygons: PolygonModel[] = [];


  constructor(
    public debuggerService: DebuggerService,
    public debuggerState: DebuggerStateService,
    private readonly polygonService: PolygonService) { }

  ngOnInit() {

    this.polygons.push({
      name: 'Square',
      vertices: [
        { X: 500, Y: 200, positionInPolygon: 0 },
        { X: 500, Y: 400, positionInPolygon: 1 },
        { X: 700, Y: 400, positionInPolygon: 2 },
        { X: 700, Y: 200, positionInPolygon: 3 }
      ],
      isComplete: true
    });

  }

  toggleLogs(): void {
    this.logsShown = !this.logsShown;
  }

  loadPolygon(polygon: PolygonModel): void {
    if (!polygon || polygon.vertices.length === 0) {
      return;
    }

    polygon.vertices.sort((a, b) => a.positionInPolygon - b.positionInPolygon).forEach(vertex => {
      this.polygonService.addVertexToPolygon(vertex.X, vertex.Y);
    });

    this.debuggerService.logInfo(`Successfully loaded Polygon: ${polygon.name}`);
  }

}
