import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PolygonService } from 'src/app/services/polygon.service';
import { PointService } from 'src/app/services/point.service';
import { RenderService } from 'src/app/services/render.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  private context: CanvasRenderingContext2D;

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly polygonService: PolygonService,
    private readonly pointService: PointService,
    private readonly renderService: RenderService) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    // TODO: Need to fix this. Currently only works for 1920x1080 monitors and i need to readjust it 
    // every time the flex layout changes
    const w = 1306;
    const h = 563;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;

    this.renderService.init(this.context, w, h);
  }


  addVertex(event: MouseEvent): void {
    // this typescript compiler does not know about the getBoundingClientRect method,
    // so I need to fiddle arround with any here :|
    const boundingRect = (event.target as any).getBoundingClientRect();

    if (event.button === 0) {
      this.polygonService.addVertexToPolygon(
        event.clientX - boundingRect.left,
        event.clientY - boundingRect.top);
    }
  }

  addPoint(event: MouseEvent): void {
    // this typescript compiler does not know about the getBoundingClientRect method,
    // so I need to fiddle arround with any here :|
    const boundingRect = (event.target as any).getBoundingClientRect();

    event.preventDefault();
    this.pointService.changePoint(
      event.clientX - boundingRect.left,
      event.clientY - boundingRect.top
    );
  }

}
