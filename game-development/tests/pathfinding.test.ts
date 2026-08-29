import { describe, it, expect } from 'vitest';
import { Vector2 } from '../src/math/Vector2';
import { AStar } from '../src/ai/AStar';

describe('A* Grid Pathfinding Unit Test Suite', () => {
  it('Finds optimal path around obstacles', () => {
    const grid = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ];
    const path = AStar.findPath(grid, new Vector2(0, 0), new Vector2(3, 2));
    expect(path.length).toBeGreaterThan(0);
    expect(path[0].x).toBe(0);
    expect(path[path.length - 1].x).toBe(3);
  });
});
