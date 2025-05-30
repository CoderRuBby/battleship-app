import { describe, it, expect } from 'vitest';

import AiGameBoard from '~/utils/ai-gameboard';
import Ship from '~/utils/ship-object';

describe('AiGameBoard', () => {
  const Ai = new AiGameBoard();
  const Ship1 = new Ship('foo', 2);

  describe('placeShip', () => {
    it('can place a single ship on the gameboard', () => {
      Ai.placeShip(Ship1, 0, 1);

      expect(Ai.gameboard[0].ship).toEqual(Ship1);
      expect(Ai.gameboard[1].ship).toEqual(Ship1);
    });
  });
});
