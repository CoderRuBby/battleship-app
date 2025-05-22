import { describe, it, expect } from 'vitest';
import GameBoard from '~/utils/gameboard-object';

describe('GameBoard', () => {
  const testGameBoard = new GameBoard();

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
});
