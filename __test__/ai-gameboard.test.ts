import { describe, it, expect, beforeEach } from 'vitest';

import AiGameBoard from '~/utils/ai-gameboard';
import Ship from '~/utils/ship-object';

describe('AiGameboard', () => {
  let Ai: AiGameBoard;
  let Ship1: Ship;
  let Ship2: Ship;

  beforeEach(() => {
    Ai = new AiGameBoard();
    Ship1 = new Ship('foo', 2);
    Ship2 = new Ship('bar', 3);
  });

  describe('assignShipStartPoint', () => {
    it('can assign a ship a shipStartPoint', () => {
      const square = 5;
      const expectShip = new Ship('foo', 2);
      expectShip.addShipStart(square);

      Ai.selectShip(Ship1);
      Ai.assignShipStartPoint(square);

      expect(Ship1).toEqual(expectShip);
    });

    it('can assign multiple ships a start point', () => {
      let square = 35;
      let expectShip = new Ship('foo', 2);
      expectShip.addShipStart(square);

      Ai.selectShip(Ship1);
      Ai.assignShipStartPoint(square);

      expect(Ship1).toEqual(expectShip);

      square = 60;
      expectShip = new Ship('bar', 3);
      expectShip.addShipStart(square);

      Ai.selectShip(Ship2);
      Ai.assignShipStartPoint(square);

      expect(Ship2).toEqual(expectShip);
    });

    it('will not assign a start point already used', () => {
      const square = 35;
      const expectShip = new Ship('bar', 3);

      Ai.gameboard[square].ship = Ship1;
      Ai.selectShip(Ship2);
      Ai.assignShipStartPoint(square);

      expect(Ship2).toEqual(expectShip);
    });
  });

  describe('placeShipOnGameboard', () => {
    it('can place all ships on the gameboard', () => {
      Ai.placeShipOnGameBoard();

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Number.isInteger(Ai.Carrier.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Carrier.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Battleship.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Battleship.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Destroyer.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Destroyer.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Submarine.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Submarine.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Cruiser.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Cruiser.shipEndPoint)).toBe(true);
    });
  });
});
