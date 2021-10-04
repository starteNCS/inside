import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PolygonService } from 'src/app/services/polygon.service';
import { VertexModel } from 'src/app/models/vertex.model';
import { RaycastAlgorithm } from 'src/app/pip/raycast.algorithm';
import { PointModel } from 'src/app/models/point.model';
import { PointService } from 'src/app/services/point.service';
import { VectorRay } from 'src/app/pip/vector/vector-ray';
import { RaycastService } from 'src/app/services/raycast.service';

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
    private readonly raycastService: RaycastService,
    private readonly raycastAlgorithm: RaycastAlgorithm) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    // TODO: Need to fix this. Currently only works for 1920x1080 monitors and i need to readjust it 
    // every time the flex layout changes
    this.canvas.nativeElement.width = 1240;
    this.canvas.nativeElement.height = 620;

    this.polygonService.onAddVertex.subscribe(vertex => this.drawVertex(vertex));
    this.polygonService.onAddEdge.subscribe(vertices => this.drawEdge(vertices[0], vertices[1]));
    this.polygonService.onAddIntersection.subscribe(point => this.drawIntersection(point));
    this.pointService.point.subscribe(point => this.drawPoint(point));
    this.raycastService.vectorRay.subscribe(ray => this.drawRay(ray));

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

  @HostListener('document:keydown', ['$event'])
  finishPolygon(event: KeyboardEvent): void {
    if (event.key === ' ') {
      this.polygonService.finishPolygon();
    } else if (event.key === 'c') {
      this.raycastAlgorithm.isPointInPolygon(this.pointService.currentPoint as PointModel);
    }
  }

  private drawRay(ray: VectorRay): void {
    this.context.beginPath();
    this.context.moveTo(ray.location.X, ray.location.Y);
    this.context.lineTo(ray.location.X + 10000 * ray.dirction.X, ray.location.Y + 10000 * ray.dirction.Y);
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'white';
    this.context.stroke();
  }

  private drawPoint(point: PointModel): void {
    this.context.beginPath();
    this.context.arc(point.X, point.Y, 10, 0, 2 * Math.PI);
    this.context.fillStyle = 'green';
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'white';
    this.context.stroke();
  }

  private drawVertex(vertex: VertexModel): void {
    this.context.beginPath();
    this.context.arc(vertex.X, vertex.Y, 10, 0, 2 * Math.PI);
    this.context.fillStyle = 'red';
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'white';
    this.context.stroke();
  }

  private drawIntersection(point: PointModel): void {
    this.context.beginPath();
    this.context.moveTo(point.X - 5, point.Y - 5);
    this.context.lineTo(point.X + 5, point.Y + 5);

    this.context.moveTo(point.X - 5, point.Y + 5);
    this.context.lineTo(point.X + 5, point.Y - 5);

    this.context.lineWidth = 2;
    this.context.strokeStyle = 'orange';
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
