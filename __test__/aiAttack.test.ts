import { describe, it, expect, beforeEach } from 'vitest';
import type { aiAttackInterface } from '~/utils/aiAttack';
import aiAttack from '~/utils/aiAttack';
import { createPlayer1 } from './testData';

describe('aiAttack', () => {
  let Opponent: ReturnType<typeof createPlayer1>;
  let newAiAttackSystem: aiAttackInterface;

  beforeEach(() => {
    Opponent = createPlayer1();
    newAiAttackSystem = aiAttack();
  });

  describe('randomAttackLocation', () => {
    it('will return a possible square to be attacked', () => {
      const randomLocation = newAiAttackSystem.randomAttackLocation(
        Opponent,
        100,
      );

      expect(Number.isInteger(randomLocation)).toBe(true);
    });

    it('will not get a location that has a miss', () => {
      const testLocation = 45;

      Opponent.board[testLocation].isMiss = true;

      const randomLocation = newAiAttackSystem.randomAttackLocation(
        Opponent,
        100,
        testLocation,
      );

      expect(randomLocation).not.toBe(testLocation);
    });

    it('will not get a location that has a hit', () => {
      const testLocation = 45;

      Opponent.board[testLocation].isHit = true;

      const randomLocation = newAiAttackSystem.randomAttackLocation(
        Opponent,
        100,
        testLocation,
      );

      expect(randomLocation).not.toBe(testLocation);
    });
  });

  describe('aiAttackLogic', () => {
    it('attacks Player location which can result in a miss', () => {
      const [attackLocation, obj] = newAiAttackSystem.aiAttackLogic(Opponent);

      expect(obj.board[attackLocation].isMiss).toBe(true);
      expect(obj.board[attackLocation].isHit).toBe(false);
    });

    describe('when attack is a hit', () => {
      it('attacks Player location which can result in a hit', () => {
        const attackLocation = 45;

        Opponent.board[attackLocation].ship = Opponent.props.allShips[0];

        const [location, obj] = newAiAttackSystem.aiAttackLogic(
          Opponent,
          attackLocation,
        );

        expect(obj.board[location].isHit).toBe(true);
        expect(obj.board[location].isMiss).toBe(false);
      });
    });
  });
});
