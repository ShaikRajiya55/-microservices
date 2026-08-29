import { describe, it, expect } from 'vitest';
import { Checksum } from '../src/save/Checksum';

describe('Save State & Checksum Unit Test Suite', () => {
  it('Computes consistent string checksums', () => {
    const data = JSON.stringify({ player: 'Hero', hp: 100, level: 5 });
    const hash1 = Checksum.compute(data);
    const hash2 = Checksum.compute(data);

    expect(hash1).toBe(hash2);
    expect(typeof hash1).toBe('number');
  });
});
