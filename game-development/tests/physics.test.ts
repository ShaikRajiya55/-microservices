import { describe, it, expect } from 'vitest';
import { Vector2 } from '../src/math/Vector2';
import { SAT } from '../src/physics/SAT';

describe('Physics Engine & SAT Collision Unit Test Suite', () => {
  it('Detects overlapping polygons using SAT algorithm', () => {
    const polyA = [new Vector2(0,0), new Vector2(10,0), new Vector2(10,10), new Vector2(0,10)];
    const polyB = [new Vector2(5,5), new Vector2(15,5), new Vector2(15,15), new Vector2(5,15)];
    const polyC = [new Vector2(20,20), new Vector2(30,20), new Vector2(30,30), new Vector2(20,30)];

    expect(SAT.collidePolygons(polyA, polyB)).toBe(true);
    expect(SAT.collidePolygons(polyA, polyC)).toBe(false);
  });
});
