import { Vector2 } from "./vector";

export class VectorRay {

    constructor(public location: Vector2, public dirction: Vector2) { }

    /**
     * Calculates the multiples of both direction Vectors needed to find the intersection point
     * @param other The Vector ray to search an intersection with
     * @returns r (0): multiple of this direction vector, t (1): multiple of other direction vector
     */
    getMultiplesOfDirectionVectorsForIntersection(other: VectorRay): [r: number, t: number] {
        const dividendT = -(this.location.X * other.dirction.Y - this.location.Y * other.dirction.X + other.dirction.X * other.location.Y - other.dirction.Y * other.location.X);
        const divisorT = this.dirction.X * other.dirction.Y - this.dirction.Y * other.dirction.X;

        const dividendR = this.dirction.X * (this.location.Y - other.location.Y) - this.dirction.Y * (this.location.X - other.location.X);
        const divisorR = this.dirction.X * other.dirction.Y - this.dirction.Y * other.dirction.X;

        return [dividendT / divisorT, dividendR / divisorR];
    }

    /**
     * Calculates the intersectionpoint of two vector rays
     * @param other The Vector ray to search the intersectionpoint with
     * @returns Vector2 if there is an intersection, undefined is there isnt
     */
    getIntersectionPoint(other: VectorRay): Vector2 | undefined {
        const multiples = this.getMultiplesOfDirectionVectorsForIntersection(other);

        if (!this.isCorrectNumber(multiples[0]) || !this.isCorrectNumber(multiples[1])) {
            return undefined;
        }

        return this.location.add(this.dirction.multiply(multiples[0]));
    }

    private isCorrectNumber(toCheck: number): boolean {
        return toCheck !== undefined || toCheck !== NaN || toCheck !== Infinity;
    }

}