import { beforeEach } from 'vitest';
import { describe, it, expect, test } from 'vitest';
import GameBoard from '~/utils/gameboard-object';
import Ship from '~/utils/ship-object';

describe('GameBoard', () => {
  let testGameBoard: GameBoard;

  beforeEach(() => {
    testGameBoard = new GameBoard();
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
  });
  describe('shipOnClick', () => {
    const TestShip = new Ship('foo', 3);
    const SecondTestShip = new Ship('bar', 5);

    it('can select a ship', () => {
      testGameBoard.shipOnClick(TestShip);

      expect(testGameBoard.selectedShip).toEqual(TestShip);
    });

    it('can deselect the ship if clicked again', () => {
      testGameBoard.shipOnClick(TestShip);
      expect(testGameBoard.selectedShip).toEqual(TestShip);

      testGameBoard.shipOnClick(TestShip);

      expect(testGameBoard.selectedShip).toEqual('none');
    });

    it('can select a different ship', () => {
      testGameBoard.shipOnClick(TestShip);
      testGameBoard.shipOnClick(SecondTestShip);

      expect(testGameBoard.selectedShip).toEqual(SecondTestShip);
    });

    test('de-selecting a ship will clear shipStartPoint', () => {
      const TestShip = new Ship('foo', 3);
      const shipStartPoint = 45;
      testGameBoard.selectShip(TestShip);
      testGameBoard.squareOnClick(shipStartPoint);
      testGameBoard.selectShip(TestShip);
      expect(TestShip.shipStartPoint).toBe('none');
    });

    test('selecting a different ship will clear old ship shipStartPoint', () => {
      const TestShip = new Ship('foo', 3);
      const shipStartPoint = 45;
      const TestShipTwo = new Ship('fum', 4);
      testGameBoard.selectShip(TestShip);
      testGameBoard.squareOnClick(shipStartPoint);
      testGameBoard.selectShip(TestShipTwo);
      expect(TestShip.shipStartPoint).toBe('none');
    });
  });

  describe('squareOnclick', () => {
    it('will assign shipStartPoint if ship is selected', () => {
      const TestShip = new Ship('foo', 3);
      const shipStartPoint = 0;
      testGameBoard.selectShip(TestShip);
      testGameBoard.squareOnClick(shipStartPoint);
      expect(TestShip.shipStartPoint).toEqual(0);
    });

    it('will assign shipEndPoint if shipStartPoint is assigned', () => {
      const TestShip = new Ship('bar', 3);
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      testGameBoard.selectShip(TestShip);
      testGameBoard.squareOnClick(shipStartPoint);
      testGameBoard.squareOnClick(shipEndPoint);
      expect(TestShip.shipEndPoint).toBe(20);
    });

    it('will place ship on gameboard', () => {
      const TestShip = new Ship('bar', 3);
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      testGameBoard.selectShip(TestShip);
      testGameBoard.squareOnClick(shipStartPoint);
      testGameBoard.squareOnClick(shipEndPoint);
      expect(testGameBoard.gameboard[0].ship).toEqual(TestShip);
      expect(testGameBoard.gameboard[10].ship).toEqual(TestShip);
      expect(testGameBoard.gameboard[20].ship).toEqual(TestShip);
    });

    it('will not assign shipStartPoint if already being used', () => {
      const TestShip = new Ship('bar', 3);
      const shipStartPoint = 0;
      testGameBoard.selectShip(TestShip);
      testGameBoard.squareOnClick(shipStartPoint);
      testGameBoard.squareOnClick(2);

      const TestShip2 = new Ship('foo', 4);
      testGameBoard.selectShip(TestShip2);
      testGameBoard.squareOnClick(shipStartPoint);
      expect(testGameBoard.gameboard[0].ship).toEqual(TestShip);
      expect(TestShip2.shipStartPoint).toBe('none');
    });

    it('will not place a ship in the same location', () => {
      const TestShip = new Ship('bar', 3);
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      testGameBoard.selectShip(TestShip);
      testGameBoard.squareOnClick(shipStartPoint);
      testGameBoard.squareOnClick(shipEndPoint);
      console.log(TestShip);

      const TestShip2 = new Ship('foo', 4);
      const shipStartPoint2 = 13;
      const shipEndPoint2 = 10;
      testGameBoard.selectShip(TestShip2);
      testGameBoard.squareOnClick(shipStartPoint2);
      testGameBoard.squareOnClick(shipEndPoint2);
      //!shipStartPoint is none
      console.log(TestShip);
      expect(testGameBoard.gameboard[0].ship).toEqual(TestShip);
      expect(testGameBoard.gameboard[10].ship).toEqual(TestShip);
      expect(testGameBoard.gameboard[20].ship).toEqual(TestShip);
    });
  });
});
