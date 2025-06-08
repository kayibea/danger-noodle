// import type { Point } from 'game/types/game';

export default class Vector2 {
  constructor(public x: number = 0, public y: number = 0) {}

  public unpack(): [number, number] {
    return [this.x, this.y];
  }

  public mul(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  public add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  public sub(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public static get up(): Vector2 {
    return new Vector2(0, -1);
  }

  public static get down(): Vector2 {
    return new Vector2(0, 1);
  }

  public static get left(): Vector2 {
    return new Vector2(-1, 0);
  }

  public static get right(): Vector2 {
    return new Vector2(1, 0);
  }
}
