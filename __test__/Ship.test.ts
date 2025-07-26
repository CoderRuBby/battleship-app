import { describe, beforeEach, it, expect } from 'vitest';
import Ship from '~/utils/Ship';

describe('Ship', () => {
  let Ship1: Ship;

  beforeEach(() => {
    Ship1 = new Ship('Ship1', 4);
  });

  describe('isHit', () => {
    it('will add hit location to hitLocations property', () => {
      const hitLocation = 45;

      Ship1.isHit(hitLocation);

      expect(Ship1.hitLocations).toContain(hitLocation);
    });
  });

  describe('getHitLocations', () => {
    it('can return all locations that are hit on Ship1', () => {
      const firstHit = 5;
      const secondHit = 6;

      Ship1.isHit(firstHit);
      Ship1.isHit(secondHit);
      Ship1.getHitLocations();

      expect(Ship1.hitLocations).toEqual([5, 6]);
    });
  });
});
