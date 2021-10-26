import { XY } from './XY.model'

export class PointModel implements XY {
    X: number;
    Y: number;
    text?: string = 'p1';
}