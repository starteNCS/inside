import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PolygonService } from 'src/app/services/polygon.service';
import { VertexModel } from 'src/app/models/vertex.model';

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

    this.polygonService.onAddVertex.subscribe(vertex => this.drawVertex(vertex));
    this.polygonService.onAddEdge.subscribe(vertices => this.drawEdge(vertices[0], vertices[1]));
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

  private drawVertex(vertex: VertexModel) {
    this.context.beginPath();
    this.context.arc(vertex.X, vertex.Y, 10, 0, 2 * Math.PI);
    this.context.fillStyle = 'red';
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'white';
    this.context.stroke();
  }

  private drawEdge(fromVertex: VertexModel, toVertex: VertexModel): void {
    this.context.beginPath();
    this.context.moveTo(fromVertex.X, fromVertex.Y);
    this.context.lineTo(toVertex.X, toVertex.Y);
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'white';
    this.context.stroke();
  }
}
