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

  @ViewChild('canvasContainer') canvasContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly polygonService: PolygonService,
    private readonly pointService: PointService,
    private readonly renderService: RenderService) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.renderService.init(this.context);

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas(), false);
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

  resizeCanvas(): void {
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;

    this.renderService.updateSize(width, height);

    // if the redraw call is not enqueued into the callstack, an expression (drawTime) changes after it was marked as checked 
    setTimeout(() => {
      this.renderService.redraw();
    }, 0);
  }

}
