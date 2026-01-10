import { describe, it, expect, beforeEach } from 'vitest';
import type { gameBoardInterface } from '~/utils/GameBoard';
import gameBoard from '~/utils/GameBoard';
import type { shipInterface } from '~/utils/Ship';
import ship from '~/utils/Ship';
import type { aiAttackInterface } from '~/utils/aiAttack';
import aiAttack from '~/utils/aiAttack';

describe('aiAttack', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let Opponent: gameBoardInterface;
  let newAiAttackSystem: aiAttackInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    Opponent = gameBoard(shipsArray);
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

      Opponent.board[attackLocation].ship = Opponent.allShips[0];

      const [location, obj] = newAiAttackSystem.aiAttackLogic(
        Opponent,
        attackLocation,
      );

      expect(obj.board[location].isHit).toBe(true);
      expect(obj.board[location].isMiss).toBe(false);
    });
  });
});
