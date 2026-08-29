/**
 * Aetheria Engine - 3x3 Matrix Transformation Library
 */
export class Matrix3 {
  public elements: Float32Array;

  constructor() {
    this.elements = new Float32Array([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
  }

  public identity(): this {
    this.elements.set([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
    return this;
  }

  public copy(m: Matrix3): this {
    this.elements.set(m.elements);
    return this;
  }

  public multiply(m: Matrix3): this {
    const ae = this.elements;
    const be = m.elements;
    const a11 = ae[0], a12 = ae[3], a13 = ae[6];
    const a21 = ae[1], a22 = ae[4], a23 = ae[7];
    const a31 = ae[2], a32 = ae[5], a33 = ae[8];

    const b11 = be[0], b12 = be[3], b13 = be[6];
    const b21 = be[1], b22 = be[4], b23 = be[7];
    const b31 = be[2], b32 = be[5], b33 = be[8];

    ae[0] = a11 * b11 + a12 * b21 + a13 * b31;
    ae[3] = a11 * b12 + a12 * b22 + a13 * b32;
    ae[6] = a11 * b13 + a12 * b23 + a13 * b33;

    ae[1] = a21 * b11 + a22 * b21 + a23 * b31;
    ae[4] = a21 * b12 + a22 * b22 + a23 * b32;
    ae[7] = a21 * b13 + a22 * b23 + a23 * b33;

    ae[2] = a31 * b11 + a32 * b21 + a33 * b31;
    ae[5] = a31 * b12 + a32 * b22 + a33 * b32;
    ae[8] = a31 * b13 + a32 * b23 + a33 * b33;

    return this;
  }

  public translate(tx: number, ty: number): this {
    const e = this.elements;
    e[6] += e[0] * tx + e[3] * ty;
    e[7] += e[1] * tx + e[4] * ty;
    return this;
  }

  public rotate(angle: number): this {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const e = this.elements;

    const m00 = e[0], m01 = e[1];
    const m10 = e[3], m11 = e[4];

    e[0] = m00 * cos + m10 * sin;
    e[1] = m01 * cos + m11 * sin;
    e[3] = m00 * -sin + m10 * cos;
    e[4] = m01 * -sin + m11 * cos;
    return this;
  }

  public scale(sx: number, sy: number): this {
    const e = this.elements;
    e[0] *= sx; e[1] *= sx;
    e[3] *= sy; e[4] *= sy;
    return this;
  }

  public determinant(): number {
    const e = this.elements;
    const a = e[0], b = e[1], c = e[2];
    const d = e[3], f = e[4], g = e[5];
    const h = e[6], i = e[7], j = e[8];

    return a * (f * j - g * i) - b * (d * j - g * h) + c * (d * i - f * h);
  }
}
