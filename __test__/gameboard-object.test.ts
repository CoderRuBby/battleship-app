import { describe, it, expect, beforeEach, test } from 'vitest';
import GameBoard from '~/utils/gameboard-object';
import Ship from '~/utils/ship-object';

describe('GameBoard', () => {
  let testGameBoard: GameBoard;
  let Ship1: Ship;
  let Ship2: Ship;
  let Opponent: GameBoard;

  beforeEach(() => {
    testGameBoard = new GameBoard();
    Ship1 = new Ship('foo', 3);
    Ship2 = new Ship('bar', 4);
    Opponent = new GameBoard();
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

    test('all ships can be placed on the gameboard', () => {
      testGameBoard.Battleship.isPlaced = true;
      testGameBoard.Carrier.isPlaced = true;
      testGameBoard.Cruiser.isPlaced = true;
      testGameBoard.Destroyer.isPlaced = true;

      const startSquare = 30;
      const endSquare = 31;
      testGameBoard.Submarine.addShipStart(startSquare);
      testGameBoard.selectShip(testGameBoard.Submarine);
      testGameBoard.shipPlacement(endSquare);

      expect(testGameBoard.allShipsPlaced).toBe(true);
    });
  });

  describe('attack', () => {
    it('can hit a ship on the opponents gameboard', () => {
      const square = 45;
      Opponent.gameboard[square].ship = Ship1;
      const expectShip = new Ship('foo', 3);
      expectShip.isHit();

      testGameBoard.attack(square, Opponent);

      expect(Opponent.gameboard[square].isHit).toBe(true);
      expect(Opponent.gameboard[square].ship).toEqual(expectShip);
    });

    it('can attack a square with no ship on the opponents board', () => {
      const square = 62;
      const ExpectOpponent = new GameBoard();
      ExpectOpponent.gameboard[square].isMiss = true;

      testGameBoard.attack(square, Opponent);

      expect(Opponent.gameboard[square].isMiss).toBe(true);
    });
  });
});
