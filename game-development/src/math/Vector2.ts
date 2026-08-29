/**
 * Aetheria Engine - Vector2D Mathematics Library
 * High-performance 2D Vector operations for game physics, rendering, and navigation.
 */
export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public static zero(): Vector2 { return new Vector2(0, 0); }
  public static one(): Vector2 { return new Vector2(1, 1); }
  public static up(): Vector2 { return new Vector2(0, -1); }
  public static down(): Vector2 { return new Vector2(0, 1); }
  public static left(): Vector2 { return new Vector2(-1, 0); }
  public static right(): Vector2 { return new Vector2(1, 0); }

  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  public copy(v: Vector2): this {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public add(v: Vector2): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public static add(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  public addScalar(s: number): this {
    this.x += s;
    this.y += s;
    return this;
  }

  public sub(v: Vector2): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public static sub(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  public multiply(v: Vector2): this {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  public multiplyScalar(s: number): this {
    this.x *= s;
    this.y *= s;
    return this;
  }

  public static multiplyScalar(v: Vector2, s: number): Vector2 {
    return new Vector2(v.x * s, v.y * s);
  }

  public divide(v: Vector2): this {
    this.x /= v.x !== 0 ? v.x : 1;
    this.y /= v.y !== 0 ? v.y : 1;
    return this;
  }

  public divideScalar(s: number): this {
    if (s !== 0) {
      this.x /= s;
      this.y /= s;
    }
    return this;
  }

  public dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  public static dot(a: Vector2, b: Vector2): number {
    return a.x * b.x + a.y * b.y;
  }

  public cross(v: Vector2): number {
    return this.x * v.y - this.y * v.x;
  }

  public static cross(a: Vector2, b: Vector2): number {
    return a.x * b.y - a.y * b.x;
  }

  public lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  public length(): number {
    return Math.sqrt(this.lengthSq());
  }

  public normalize(): this {
    const len = this.length();
    if (len > 0) {
      this.divideScalar(len);
    }
    return this;
  }

  public distanceToSq(v: Vector2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  public distanceTo(v: Vector2): number {
    return Math.sqrt(this.distanceToSq(v));
  }

  public static distance(a: Vector2, b: Vector2): number {
    return a.distanceTo(b);
  }

  public angle(): number {
    return Math.atan2(this.y, this.x);
  }

  public angleTo(v: Vector2): number {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator === 0) return 0;
    const theta = this.dot(v) / denominator;
    return Math.acos(Math.max(-1, Math.min(1, theta)));
  }

  public rotate(angle: number): this {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const nx = this.x * cos - this.y * sin;
    const ny = this.x * sin + this.y * cos;
    this.x = nx;
    this.y = ny;
    return this;
  }

  public lerp(target: Vector2, alpha: number): this {
    this.x += (target.x - this.x) * alpha;
    this.y += (target.y - this.y) * alpha;
    return this;
  }

  public static lerp(a: Vector2, b: Vector2, alpha: number): Vector2 {
    return new Vector2(
      a.x + (b.x - a.x) * alpha,
      a.y + (b.y - a.y) * alpha
    );
  }

  public reflect(normal: Vector2): this {
    const d = 2 * this.dot(normal);
    this.x -= d * normal.x;
    this.y -= d * normal.y;
    return this;
  }

  public clamp(min: Vector2, max: Vector2): this {
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    return this;
  }

  public clampScalar(min: number, max: number): this {
    this.x = Math.max(min, Math.min(max, this.x));
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  public equals(v: Vector2, epsilon: number = 1e-6): boolean {
    return Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon;
  }

  public toArray(): [number, number] {
    return [this.x, this.y];
  }

  public toString(): string {
    return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
}
