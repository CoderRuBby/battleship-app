import { beforeEach } from 'vitest';
import { describe, it, expect } from 'vitest';
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
  });
});
