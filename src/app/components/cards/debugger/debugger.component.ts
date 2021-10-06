import { Component, OnInit } from '@angular/core';
import { LogLevel } from 'src/app/models/enums/log-level.enum';
import { PolygonModel } from 'src/app/models/polygon.model';
import { DebuggerStateService } from 'src/app/services/debugger-state.service';
import { DebuggerService } from 'src/app/services/debugger.service';
import { PolygonService } from 'src/app/services/polygon.service';
import { RaycastService } from 'src/app/services/raycast.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss']
})
export class DebuggerComponent implements OnInit {

  public LogLevel = LogLevel;

  selected: PolygonModel;
  polygons: PolygonModel[] = [];

  isSimulationRunning = false;

  logsShown = false;


  constructor(
    public debuggerService: DebuggerService,
    public debuggerState: DebuggerStateService,
    private readonly polygonService: PolygonService,
    private readonly state: StateService,
    private readonly raycastService: RaycastService) { }

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

  loadPolygon(polygon: PolygonModel): void {
    if (!polygon || polygon.vertices.length === 0) {
      return;
    }

    this.state.reset();
    polygon.vertices.sort((a, b) => a.positionInPolygon - b.positionInPolygon).forEach(vertex => {
      this.polygonService.addVertexToPolygon(vertex.X, vertex.Y);
    });

    this.debuggerService.logInfo(`Successfully loaded Polygon: ${polygon.name}`);
  }

  reset(): void {
    this.state.reset();
  }

  startSimulation(): void {
    if (!this.state.getPolygon().isComplete) {
      return;
    }
    this.isSimulationRunning = true;

    let currentAngle = 0;
    const interval = setInterval(() => {
      this.raycastService.changeAngle(currentAngle++);

      if (currentAngle === 360) {
        this.isSimulationRunning = false;
        clearInterval(interval);
      }
    }, 10)
  }


  toggleLogs(): void {
    this.logsShown = !this.logsShown;
  }

}
