import { describe, it, beforeEach, expect } from 'vitest';
import AiAttack from '~/utils/AiAttack';
import GameBoard from '~/utils/GameBoard';

describe('AiAttack', () => {
  let Ai: AiAttack;
  let Player: GameBoard;

  beforeEach(() => {
    Player = new GameBoard();
    Ai = new AiAttack();
  });

  describe('randomAttackLocation', () => {
    it('will return a number', () => {
      const randomLocation = Ai.randomAttackLocation(Player);

      expect(Number.isInteger(randomLocation)).toBe(true);
    });

    it('will not get a location that has a miss', () => {
      const testLocation = 45;

      Player.gameboard[testLocation].isMiss = true;

      const randomLocation = Ai.randomAttackLocation(Player, testLocation);

      expect(randomLocation).not.toBe(testLocation);
    });
  });
});
