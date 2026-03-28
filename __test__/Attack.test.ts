import { describe, it, beforeEach, expect } from 'vitest';
import type { attackInterface } from '~/utils/attack';
import attack from '~/utils/attack';
import { createPlayer1 } from './testData';

describe('Attack', () => {
  let Opponent: ReturnType<typeof createPlayer1>;
  let PlayerAttack: attackInterface;

  beforeEach(() => {
    Opponent = createPlayer1();
    PlayerAttack = attack();
  });

  describe('attack', () => {
    it('can hit a ship on the opponents gameboard', () => {
      const square = 45;

      Opponent.board[square].ship = Opponent.props.allShips[0];

      Opponent.props.allShips[0].isHit(square);

      PlayerAttack.logic(square, Opponent);

      expect(Opponent.board[square].isHit).toBe(true);
      expect(Opponent.board[square].ship).toEqual(Opponent.props.allShips[0]);
    });

    it('can attack a square with no ship on the opponents board', () => {
      const square = 62;

      Opponent.board[square].isMiss = true;

      PlayerAttack.logic(square, Opponent);

      expect(Opponent.board[square].isMiss).toBe(true);
    });
  });
});
