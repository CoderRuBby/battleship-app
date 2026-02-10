import { describe, beforeEach, it, expect } from 'vitest';
import ship from '~/utils/ship';
import type { shipInterface } from '~/utils/ship';

describe('Ship', () => {
  let Ship1: shipInterface;

  beforeEach(() => {
    Ship1 = ship('Ship1', 4);
  });

  describe('isHit', () => {
    it('will add hit location to hitLocations property', () => {
      const hitLocation = 45;

      Ship1.isHit(hitLocation);

      expect(Ship1.props.hitLocations).toContain(hitLocation);
    });
  });

  describe('getHitLocations', () => {
    it('can return all locations that are hit on Ship1', () => {
      const firstHit = 5;
      const secondHit = 6;

      Ship1.isHit(firstHit);
      Ship1.isHit(secondHit);
      Ship1.getHitLocations();

      expect(Ship1.props.hitLocations).toEqual([5, 6]);
    });
  });

  describe('reset', () => {
    it('will reset ship props', () => {
      Ship1.props.hit = 2;
      Ship1.props.sunk = true;
      Ship1.props.shipStartPoint = 46;
      Ship1.props.shipEndPoint = 45;
      Ship1.props.isPlaced = true;
      Ship1.props.placedLocations = [45, 46];
      Ship1.props.hitLocations = [45, 46];

      Ship1.reset();

      expect(Ship1.props.hit).toBe(0);
      expect(Ship1.props.sunk).toBe(false);
      expect(Ship1.props.shipStartPoint).toBe(0);
      expect(Ship1.props.shipEndPoint).toBe(0);
      expect(Ship1.props.isPlaced).toBe(false);
      expect(Ship1.props.placedLocations).toEqual([]);
      expect(Ship1.props.hitLocations).toEqual([]);
    });
  });
});
