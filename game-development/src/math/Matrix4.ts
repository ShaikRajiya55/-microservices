/**
 * Aetheria Engine - 4x4 Matrix Transformation Library for WebGL
 */
export class Matrix4 {
  public elements: Float32Array;

  constructor() {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  public identity(): this {
    this.elements.set([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    return this;
  }

  public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
    const m = new Matrix4();
    const e = m.elements;
    const rl = 1 / (right - left);
    const tb = 1 / (top - bottom);
    const fn = 1 / (far - near);

    e[0] = 2 * rl;
    e[5] = 2 * tb;
    e[10] = -2 * fn;
    e[12] = -(right + left) * rl;
    e[13] = -(top + bottom) * tb;
    e[14] = -(far + near) * fn;
    e[15] = 1;
    return m;
  }

  public static perspective(fovRad: number, aspect: number, near: number, far: number): Matrix4 {
    const m = new Matrix4();
    const e = m.elements;
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fovRad);
    const rangeInv = 1.0 / (near - far);

    e[0] = f / aspect;
    e[5] = f;
    e[10] = (near + far) * rangeInv;
    e[11] = -1;
    e[14] = near * far * rangeInv * 2;
    e[15] = 0;
    return m;
  }
}
