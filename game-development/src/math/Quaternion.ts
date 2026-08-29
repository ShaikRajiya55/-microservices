/**
 * Aetheria Engine - Quaternion Rotation Library
 */
export class Quaternion {
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public identity(): this {
    this.x = 0; this.y = 0; this.z = 0; this.w = 1;
    return this;
  }

  public setFromEuler(pitch: number, yaw: number, roll: number): this {
    const c1 = Math.cos(pitch / 2);
    const s1 = Math.sin(pitch / 2);
    const c2 = Math.cos(yaw / 2);
    const s2 = Math.sin(yaw / 2);
    const c3 = Math.cos(roll / 2);
    const s3 = Math.sin(roll / 2);

    this.x = s1 * c2 * c3 + c1 * s2 * s3;
    this.y = c1 * s2 * c3 - s1 * c2 * s3;
    this.z = c1 * c2 * s3 + s1 * s2 * c3;
    this.w = c1 * c2 * c3 - s1 * s2 * s3;
    return this;
  }
}
