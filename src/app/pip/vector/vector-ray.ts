import { multicast } from "rxjs/operators";
import { Vector2 } from "./vector";

export class VectorRay {

    constructor(public location: Vector2, public direction: Vector2) { }

    /**
     * Calculates the multiples of both direction Vectors needed to find the intersection point
     * @param other The Vector ray to search an intersection with
     * @returns r (0): multiple of this direction vector, t (1): multiple of other direction vector
     */
    getMultiplesOfDirectionVectorsForIntersection(other: VectorRay): [r: number, t: number] {
        const dividendT = -(this.location.X * other.direction.Y - this.location.Y * other.direction.X + other.direction.X * other.location.Y - other.direction.Y * other.location.X);
        const divisorT = this.direction.X * other.direction.Y - this.direction.Y * other.direction.X;

        const dividendR = this.direction.X * (this.location.Y - other.location.Y) - this.direction.Y * (this.location.X - other.location.X);
        const divisorR = this.direction.X * other.direction.Y - this.direction.Y * other.direction.X;

        return [dividendT / divisorT, dividendR / divisorR];
    }

    /**
     * Calculates the intersectionpoint of two vector rays
     * @param other The Vector ray to search the intersectionpoint with
     * @returns Vector2 if there is an intersection, undefined is there isnt
     */
    getIntersectionPoint(other: VectorRay, multiples?: [r: number, t: number]): Vector2 | undefined {
        if (!multiples) {
            multiples = this.getMultiplesOfDirectionVectorsForIntersection(other);
        }

        if (!this.isCorrectNumber(multiples[0]) || !this.isCorrectNumber(multiples[1])) {
            return undefined;
        }

        return this.location.add(this.direction.multiply(multiples[0]));
    }

    /**
     * Calculates in which direction the vector ray is facing
     * @returns: 1 -> Ray is facing upwards (towards positive y)
     *           -1 -> Ray is facing downwards (towards negative y)
     *           undefined -> illegal operation, ray may not intersect more than one time
     */
    getDirection(): number | undefined {
        if (this.direction.Y === 0) {
            return undefined;
        }

        return this.direction.Y > 0 ? 1 : -1;
    }

    private isCorrectNumber(toCheck: number): boolean {
        return toCheck !== undefined || toCheck !== NaN || toCheck !== Infinity;
    }

}