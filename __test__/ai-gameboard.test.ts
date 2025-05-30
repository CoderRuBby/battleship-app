import { describe, it, expect, beforeEach } from 'vitest';

import AiGameBoard from '~/utils/ai-gameboard';
import Ship from '~/utils/ship-object';

describe('AiGameBoard', () => {
  let Ai: AiGameBoard;
  let Ship1: Ship;
  let Ship2: Ship;
  let allShips: Ship[];

  beforeEach(() => {
    Ai = new AiGameBoard();
    Ship1 = new Ship('foo', 2);
    Ship2 = new Ship('bar', 3);
    allShips = [Ship1, Ship2];
  });

  describe('getShipStartPoint', () => {
    it('can assign shipStart', () => {
      Ai.getShipStartPoint(Ship1, 4);

      expect(Ship1.shipStartPoint).toBe(4);
    });
  });

  describe('getShipEndPoint', () => {
    it('can assign shipEndPoint to a ship', () => {
      const Ship1 = new Ship('foo', 2);
      const possibleEndPoints = [1, 10];
      const arrayIndex = 1;

      Ai.getShipEndPoint(Ship1, possibleEndPoints, arrayIndex);

      expect(Ship1.shipEndPoint).toBe(10);
    });
  });

  describe('placeShip', () => {
    it('can place a single ship on the gameboard', () => {
      //selects 0 as shipStartPoint
      const availableSquareIndex = 0;
      //selects 1 as shipEndPoint
      const endPointIndex = 0;
      //places ship at 0 and 1 on gameboard
      Ai.placeShip([Ship1], availableSquareIndex, endPointIndex);

      expect(Ai.gameboard[0].ship).toEqual(Ship1);
      expect(Ai.gameboard[1].ship).toEqual(Ship1);
    });

    it('will remove placed ship path squares from available squares', () => {
      const availableSquareIndex = 0;
      const endPointIndex = 0;
      Ai.placeShip([Ship1], availableSquareIndex, endPointIndex);

      expect(Ai.availableSquares).not.toContain(0);
      expect(Ai.availableSquares).not.toContain(1);
    });
  });
});
