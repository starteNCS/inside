import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PRESET_POLYGONS } from 'src/app/constants/polygon-map';
import { Algorithm } from 'src/app/models/enums/algorithm.enum';
import { LogLevel } from 'src/app/models/enums/log-level.enum';
import { DebuggerStateService } from 'src/app/services/debugger-state.service';
import { DebuggerService } from 'src/app/services/debugger.service';
import { PolygonService } from 'src/app/services/polygon.service';
import { RaycastService } from 'src/app/services/raycast.service';
import { RenderService } from 'src/app/services/render.service';
import { StateService } from 'src/app/services/state.service';
import { CountDialogComponent } from './count-dialog/count-dialog.component';

@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss']
})
export class DebuggerComponent implements OnInit {

  public LogLevel = LogLevel;
  public algorithm = Algorithm;

  selectedId: string;
  polygons: KeyValue<string, string>[] = [];

  isSimulationRunning = false;
  randomPointInterval: any = undefined;
  randomPointIntervalMax = 1000;
  randomPointIntervalCurrent = 0;

  logsShown = false;

  constructor(
    public debuggerService: DebuggerService,
    public debuggerState: DebuggerStateService,
    public state: StateService,
    private readonly raycastService: RaycastService,
    private readonly router: Router,
    private readonly renderService: RenderService,
    private readonly dialog: MatDialog) { }

  ngOnInit() {

    this.polygons = [...PRESET_POLYGONS.values()].map(polygon => {
      return { key: polygon.id, value: polygon.name }
    });

  }

  loadPolygon(id: string): void {
    this.router.navigateByUrl(id);
  }

  reset(): void {
    if (this.router.url === '/') {
      this.state.reset();
      return;
    }
    this.router.navigateByUrl('');
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

  randomPoint(): void {
    if (!this.state.getPolygon().isComplete) {
      return;
    }

    if (this.randomPointInterval) {
      return;
    }

    this.dialog.open(CountDialogComponent, {

    }).afterClosed().subscribe(count => {
      this.randomPointIntervalMax = count;
      this.randomPointIntervalCurrent = 0;
      const size = this.renderService.getSize();
      this.randomPointInterval = setInterval(() => {

        const x = Math.random() * size[0];
        const y = Math.random() * size[1];

        this.state.setPoint({
          X: x,
          Y: y
        });

        if (this.randomPointIntervalCurrent === this.randomPointIntervalMax) {
          clearInterval(this.randomPointInterval);
          this.randomPointInterval = undefined;
        }
        this.randomPointIntervalCurrent += 1;
      });
    });
  }

  toggleLogs(): void {
    this.logsShown = !this.logsShown;
  }

}
