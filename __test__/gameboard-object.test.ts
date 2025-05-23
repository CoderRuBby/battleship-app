import { describe, it, expect } from 'vitest';
import GameBoard from '~/utils/gameboard-object';

describe('GameBoard', () => {
  const testGameBoard = new GameBoard();

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
  });

  describe('placeShipOnGameBoard', () => {
    it('can place a ship on the gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;
      const Ship = testGameBoard.Cruiser;

      testGameBoard.placeShipOnGameBoard(Ship, shipStartPoint, shipEndPoint);

      const setShip = new Set();
      setShip.add(Ship);

      expect(testGameBoard.gameboard[0]).toEqual(setShip);
      expect(testGameBoard.gameboard[1]).toEqual(setShip);
      expect(testGameBoard.gameboard[2]).toEqual(setShip);
    });
  });
});
