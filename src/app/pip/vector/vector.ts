export class Vector2 {

    constructor(public X: number, public Y: number) { }

    public add(other: Vector2): Vector2 {
        return new Vector2(this.X + other.X, this.Y + other.Y);
    }

    public multiply(w: number): Vector2 {
        return new Vector2(this.X * w, this.Y * w);
    }
}