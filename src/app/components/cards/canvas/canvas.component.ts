import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PolygonService } from 'src/app/services/polygon.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  private context: CanvasRenderingContext2D;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private readonly polygonService: PolygonService) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    // TODO: Need to fix this. Currently only works for 1920x1080 monitors and i need to readjust it 
    // every time the flex layout changes
    this.canvas.nativeElement.width = 1312;
    this.canvas.nativeElement.height = 656;

    this.polygonService.onAddVertex.subscribe(currentPoint => {
      this.drawPoint(currentPoint.X, currentPoint.Y);
    });
  }


  addPoint(event: MouseEvent): void {
    // this typescript compiler does not know about the getBoundingClientRect method,
    // so I need to fiddle arround with any here :|
    const boundingRect = (event.target as any).getBoundingClientRect();

    this.polygonService.addVertexToPolygon(
      event.clientX - boundingRect.left,
      event.clientY - boundingRect.top);
  }

  private drawPoint(x: number, y: number) {
    this.context.beginPath();
    this.context.arc(x, y, 10, 0, 2 * Math.PI);
    this.context.fillStyle = 'red';
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'white';
    this.context.stroke();
  }
}
