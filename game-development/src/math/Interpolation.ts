export class Interpolation {
  public static linear(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  public static easeInQuad(t: number): number {
    return t * t;
  }

  public static easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  public static easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  public static cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;
  }
}
