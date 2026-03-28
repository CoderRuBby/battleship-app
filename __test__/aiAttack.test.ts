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

  describe('aiAttackLogic', () => {
    it('attacks Player location which can result in a miss', () => {
      const [attackLocation, obj] = newAiAttackSystem.aiAttackLogic(Opponent);

      expect(obj.board[attackLocation].isMiss).toBe(true);
      expect(obj.board[attackLocation].isHit).toBe(false);
    });

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
