import { describe, it, expect, beforeEach } from 'vitest';
import GameBoard from '~/utils/gameboard-object';
import Ship from '~/utils/ship-object';

describe('GameBoard', () => {
  let testGameBoard: GameBoard;
  let Ship1: Ship;
  let Ship2: Ship;

  beforeEach(() => {
    testGameBoard = new GameBoard();
    Ship1 = new Ship('foo', 3);
    Ship2 = new Ship('bar', 4);
  });

  describe('possibleShipEndPoints', () => {
    it('can output 4 endpoints', () => {
      const shipLength = 3;
      const shipStartPoint = 45;

      expect(
        testGameBoard.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([47, 43, 65, 25]);
    });

    it('can correctly output 2 endpoints', () => {
      const shipLength = 2;
      const shipStartPoint = 0;

      expect(
        testGameBoard.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([1, 10]);
    });

    it('will not output used endPoints', () => {
      testGameBoard.gameboard[0].ship = Ship1;
      testGameBoard.gameboard[1].ship = Ship1;
      testGameBoard.gameboard[2].ship = Ship1;

      const shipLength = 4;
      const shipStartPoint = 4;

      expect(
        testGameBoard.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([7, 34]);
    });
  });

  describe('possibleShipPath', () => {
    it('can output ship path', () => {
      const shipLength = 2;
      const shipStartPoint = 0;
      const shipEndPoint = 1;

      expect(
        testGameBoard.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
        ),
      ).toEqual([0, 1]);
    });

    it('will return an empty array if any square in path is used', () => {
      testGameBoard.gameboard[4].ship = Ship1;
      testGameBoard.gameboard[14].ship = Ship1;
      testGameBoard.gameboard[24].ship = Ship1;

      const shipLength = 3;
      const shipStartPoint = 4;
      const shipEndPoint = 24;

      expect(
        testGameBoard.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
        ),
      ).toEqual([]);
    });
  });

  describe('placeShipOnGameBoard', () => {
    it('can place a ship on the gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;
      const expectShip = new Ship('foo', 3);
      expectShip.isPlaced = true;

      testGameBoard.placeShipOnGameBoard(Ship1, shipStartPoint, shipEndPoint);

      expect(testGameBoard.gameboard[0].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[1].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[2].ship).toEqual(expectShip);
    });

    it('will not place a ship in un-available locations', () => {
      const expectShip = new Ship('foo', 3);

      testGameBoard.gameboard[4].ship = Ship1;
      testGameBoard.gameboard[5].ship = Ship1;
      testGameBoard.gameboard[6].ship = Ship1;

      const shipStartPoint = 4;
      const shipEndPoint = 7;
      testGameBoard.placeShipOnGameBoard(Ship2, shipStartPoint, shipEndPoint);

      expect(testGameBoard.gameboard[4].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[5].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[6].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[7].ship).toBe(null);
    });
  });
});
