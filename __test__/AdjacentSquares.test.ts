import { describe, it, beforeEach, expect } from 'vitest';
import AdjacentSquares from '~/utils/AdjacentSquares';
import GameBoard from '~/utils/GameBoard';

describe('AdjacentSquares', () => {
  let Player: GameBoard;
  let TargetingSystem: AdjacentSquares;

  beforeEach(() => {
    Player = new GameBoard();
    TargetingSystem = new AdjacentSquares();
  });

  describe('getAdjacentSquares', () => {
    it('will return [22, 24, 33, 13] given location #23', () => {
      const attackedSquare = 23;
      const adjacentSquares = TargetingSystem.getSquares(
        attackedSquare,
        Player,
      );

      expect(adjacentSquares).toContain(24);
      expect(adjacentSquares).toContain(22);
      expect(adjacentSquares).toContain(13);
      expect(adjacentSquares).toContain(33);
      expect(adjacentSquares.length).toBe(4);
    });
  });
});
