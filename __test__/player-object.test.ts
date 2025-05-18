import { describe, it, expect } from 'vitest';
import GameBoard from '~/utils/player-object';

describe('GameBoard', () => {
  describe('possibleShipEndPoints', () => {
    const testGameBoard = new GameBoard();

    it('can correctly output 4 endpoints', () => {
      expect(testGameBoard.possibleShipEndPoints(45, 3)).toEqual([
        47, 43, 65, 25,
      ]);
    });

    it('can correctly output 2 endpoints', () => {
      expect(testGameBoard.possibleShipEndPoints(0, 2)).toEqual([1, 10]);
    });
  });
});
