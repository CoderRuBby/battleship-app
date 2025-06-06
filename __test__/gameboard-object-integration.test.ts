import { beforeEach } from 'vitest';
import { describe, it, expect, test } from 'vitest';
import GameBoard from '~/utils/gameboard-object';
import Ship from '~/utils/ship-object';

describe('GameBoard', () => {
  let testGameBoard: GameBoard;
  let Ship1: Ship;
  let Ship2: Ship;

  beforeEach(() => {
    testGameBoard = new GameBoard();
    Ship1 = new Ship('foo', 2);
    Ship2 = new Ship('bar', 3);
  });

  describe('getShipPaths', () => {
    it('can output all ship paths', () => {
      const shipLength = 3;
      const shipStartPoint = 0;
      expect(testGameBoard.getShipPaths(shipLength, shipStartPoint)).toEqual([
        [0, 1, 2],
        [0, 10, 20],
      ]);
    });

    it('will output available paths only', () => {
      testGameBoard.gameboard[25].ship = Ship1;
      testGameBoard.gameboard[35].ship = Ship1;

      testGameBoard.gameboard[27].ship = Ship2;
      testGameBoard.gameboard[37].ship = Ship2;
      testGameBoard.gameboard[47].ship = Ship2;

      const shipLength = 4;
      const shipStartPoint = 26;
      expect(testGameBoard.getShipPaths(shipLength, shipStartPoint)).toEqual([
        [26, 36, 46, 56],
      ]);
    });
  });
  describe('shipPlacement', () => {
    it('can select a ship', () => {
      const expectShip = new Ship('foo', 2);
      testGameBoard.shipOnClick(Ship1);

      expect(testGameBoard.selectedShip).toEqual(expectShip);
    });

    it('can deselect the ship if clicked again', () => {
      const expectShip = new Ship('foo', 2);

      testGameBoard.shipOnClick(Ship1);
      expect(testGameBoard.selectedShip).toEqual(expectShip);

      testGameBoard.shipOnClick(Ship1);

      expect(testGameBoard.selectedShip).toEqual(null);
    });

    it('can select a different ship', () => {
      const expectShip = new Ship('bar', 3);

      testGameBoard.shipOnClick(Ship1);
      testGameBoard.shipOnClick(Ship2);

      expect(testGameBoard.selectedShip).toEqual(expectShip);
    });

    test('de-selecting a ship will clear shipStartPoint', () => {
      const shipStartPoint = 45;
      testGameBoard.selectShip(Ship1);
      testGameBoard.shipPlacement(shipStartPoint);
      testGameBoard.selectShip(Ship1);
      expect(Ship1.shipStartPoint).toBe(null);
    });

    test('selecting a different ship will clear old ship shipStartPoint', () => {
      const shipStartPoint = 45;
      testGameBoard.selectShip(Ship1);
      testGameBoard.shipPlacement(shipStartPoint);
      testGameBoard.selectShip(Ship2);
      expect(Ship1.shipStartPoint).toBe(null);
    });
  });

  describe('squareOnclick', () => {
    it('will assign shipStartPoint if ship is selected', () => {
      const shipStartPoint = 0;
      testGameBoard.selectShip(Ship1);
      testGameBoard.shipPlacement(shipStartPoint);
      expect(Ship1.shipStartPoint).toEqual(0);
    });

    it('will assign shipEndPoint if shipStartPoint is assigned', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      testGameBoard.selectShip(Ship1);
      testGameBoard.shipPlacement(shipStartPoint);
      testGameBoard.shipPlacement(shipEndPoint);
      expect(Ship1.shipEndPoint).toBe(20);
    });

    it('will place ship on gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      const expectShip = new Ship('bar', 3);
      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);
      expectShip.isPlaced = true;

      testGameBoard.selectShip(Ship2);
      testGameBoard.shipPlacement(shipStartPoint);
      testGameBoard.shipPlacement(shipEndPoint);

      expect(testGameBoard.gameboard[0].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[10].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[20].ship).toEqual(expectShip);
    });

    it('will reset selectedShip after ship is placed', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      const expectShip = new Ship('bar', 3);
      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);

      testGameBoard.selectShip(Ship2);
      testGameBoard.shipPlacement(shipStartPoint);
      testGameBoard.shipPlacement(shipEndPoint);

      expect(testGameBoard.selectedShip).toBe(null);
    });

    it('will not assign shipStartPoint if already being used', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 1;
      const expectShip = new Ship('foo', 2);
      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);
      expectShip.isPlaced = true;

      testGameBoard.selectShip(Ship1);
      testGameBoard.shipPlacement(shipStartPoint);
      testGameBoard.shipPlacement(shipEndPoint);

      testGameBoard.selectShip(Ship2);
      testGameBoard.shipPlacement(shipStartPoint);

      expect(testGameBoard.gameboard[0].ship).toEqual(expectShip);
      expect(Ship2.shipStartPoint).toBe(null);
    });

    it('will not place a ship in the same location', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 10;
      const expectShip = new Ship('foo', 2);
      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);
      expectShip.isPlaced = true;

      testGameBoard.selectShip(Ship1);
      testGameBoard.shipPlacement(shipStartPoint);
      testGameBoard.shipPlacement(shipEndPoint);

      const shipStartPoint2 = 12;
      const shipEndPoint2 = 10;
      testGameBoard.selectShip(Ship2);
      testGameBoard.shipPlacement(shipStartPoint2);
      testGameBoard.shipPlacement(shipEndPoint2);

      expect(testGameBoard.gameboard[0].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[10].ship).toEqual(expectShip);
    });
  });
});
