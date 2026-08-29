import { describe, it, expect } from 'vitest';
import { Vector2 } from '../src/math/Vector2';
import { Vector3 } from '../src/math/Vector3';
import { Matrix3 } from '../src/math/Matrix3';
import { AABB2D } from '../src/math/BoundingBox';

describe('Math Engine Unit Test Suite', () => {
  it('Vector2 operations work correctly', () => {
    const v1 = new Vector2(3, 4);
    expect(v1.length()).toBe(5);

    const v2 = new Vector2(1, 2);
    const added = Vector2.add(v1, v2);
    expect(added.x).toBe(4);
    expect(added.y).toBe(6);

    const dot = v1.dot(v2);
    expect(dot).toBe(11);
  });

  it('Vector3 operations work correctly', () => {
    const v1 = new Vector3(1, 0, 0);
    const v2 = new Vector3(0, 1, 0);
    const cross = Vector3.cross(v1, v2);
    expect(cross.x).toBe(0);
    expect(cross.y).toBe(0);
    expect(cross.z).toBe(1);
  });

  it('Matrix3 determinant & transformations work', () => {
    const m = new Matrix3();
    expect(m.determinant()).toBe(1);
  });

  it('AABB2D collision intersection works', () => {
    const box1 = new AABB2D(new Vector2(0, 0), new Vector2(10, 10));
    const box2 = new AABB2D(new Vector2(5, 5), new Vector2(15, 15));
    const box3 = new AABB2D(new Vector2(20, 20), new Vector2(30, 30));

    expect(box1.intersects(box2)).toBe(true);
    expect(box1.intersects(box3)).toBe(false);
  });
});
