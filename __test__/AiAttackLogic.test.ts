import { describe, it, beforeEach, expect } from 'vitest';
import AiAttackLogic from '~/utils/AiAttackLogic';
import GameBoard from '~/utils/GameBoard';

describe('aiAttackLogic', () => {
  let Ai: AiAttackLogic;
  let Player: GameBoard;

  beforeEach(() => {
    Player = new GameBoard();
    Ai = new AiAttackLogic();
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

    it('will not get a location that has a hit', () => {
      const testLocation = 45;

      Player.gameboard[testLocation].isHit = true;

      const randomLocation = Ai.randomAttackLocation(Player, testLocation);

      expect(randomLocation).not.toBe(testLocation);
    });
  });
});
