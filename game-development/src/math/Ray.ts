import { Vector2 } from './Vector2';

export class Ray2D {
  public origin: Vector2;
  public direction: Vector2;

  constructor(origin: Vector2 = Vector2.zero(), direction: Vector2 = Vector2.right()) {
    this.origin = origin;
    this.direction = direction.normalize();
  }

  public getPoint(distance: number): Vector2 {
    return Vector2.add(this.origin, Vector2.multiplyScalar(this.direction, distance));
  }
}
