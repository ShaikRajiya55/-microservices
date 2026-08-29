import { describe, it, expect } from 'vitest';
import { CombatEngine } from '../src/rpg/Combat';

describe('Combat System & Damage Formulas Unit Test Suite', () => {
  it('Calculates damage reduction based on armor defense', () => {
    const rawAtk = 100;
    const defZero = CombatEngine.calculateDamage(rawAtk, 0);
    const def100 = CombatEngine.calculateDamage(rawAtk, 100);

    expect(defZero).toBe(100);
    expect(def100).toBe(50);
  });
});
