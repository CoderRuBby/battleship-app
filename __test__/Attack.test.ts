import { describe, it, beforeEach, expect } from 'vitest';
import type { GameBoardType } from '~/utils/GameBoard';
import { GameBoard } from '~/utils/GameBoard';
import type { AttackType } from '~/utils/Attack';
import { Attack } from '~/utils/Attack';
import type { ShipType } from '~/utils/Ship';
import { Ship } from '~/utils/Ship';

describe('Attack', () => {
  let Ship1: ShipType;
  let Opponent: GameBoardType;
  let PlayerAttack: AttackType;

  beforeEach(() => {
    Ship1 = Ship('foo', 3);
    Opponent = GameBoard([Ship1]);
    PlayerAttack = Attack();
  });

  describe('attack', () => {
    it('can hit a ship on the opponents gameboard', () => {
      const square = 45;

      Opponent.board[square].ship = Ship1;

      PlayerAttack.attack(square, Opponent);

      expect(Opponent.board[square].isHit).toBe(true);
      expect(Opponent.board[square].ship).toEqual(Ship1);
    });

    it('can attack a square with no ship on the opponents board', () => {
      const square = 62;

      PlayerAttack.attack(square, Opponent);

      expect(Opponent.board[square].isMiss).toBe(true);
    });
  });
});
