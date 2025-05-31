import { describe, it, expect, beforeEach } from 'vitest';

import AiGameBoard from '~/utils/ai-gameboard';

describe('AiGameBoard', () => {
  let Ai: AiGameBoard;

  beforeEach(() => {
    Ai = new AiGameBoard();
  });
  describe('getRandomNumber', () => {
    it('can generate a random number from 0-99', () => {
      expect(Ai.getRandomNumber()).toBeGreaterThanOrEqual(0);
      expect(Ai.getRandomNumber()).toBeLessThanOrEqual(99);
      expect(Number.isInteger(Ai.getRandomNumber())).toBe(true);
    });
  });
});
