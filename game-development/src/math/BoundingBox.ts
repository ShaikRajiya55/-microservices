import { Vector2 } from './Vector2';

export class AABB2D {
  public min: Vector2;
  public max: Vector2;

  constructor(min: Vector2 = Vector2.zero(), max: Vector2 = Vector2.zero()) {
    this.min = min;
    this.max = max;
  }

  public intersects(other: AABB2D): boolean {
    return (
      this.min.x <= other.max.x &&
      this.max.x >= other.min.x &&
      this.min.y <= other.max.y &&
      this.max.y >= other.min.y
    );
  }

  public containsPoint(p: Vector2): boolean {
    return p.x >= this.min.x && p.x <= this.max.x && p.y >= this.min.y && p.y <= this.max.y;
  }
}
