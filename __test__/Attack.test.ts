import { describe, it, beforeEach, expect } from 'vitest';
import Attack from '~/utils/Attack';
import GameBoard from '~/utils/GameBoard';
import Ship from '~/utils/Ship';

describe('Attack', () => {
  let Opponent: GameBoard;
  let PlayerAttack: Attack;
  let Ship1: Ship;

  beforeEach(() => {
    Opponent = new GameBoard();
    PlayerAttack = new Attack(Opponent);
    Ship1 = new Ship('foo', 3);
  });

  describe('attack', () => {
    it('can hit a ship on the opponents gameboard', () => {
      const square = 45;
      const expectShip = new Ship('foo', 3);

      Opponent.gameboard[square].ship = Ship1;

      expectShip.isHit();

      PlayerAttack.attack(square);

      expect(Opponent.gameboard[square].isHit).toBe(true);
      expect(Opponent.gameboard[square].ship).toEqual(expectShip);
    });

    it('can attack a square with no ship on the opponents board', () => {
      const square = 62;
      const ExpectOpponent = new GameBoard();

      ExpectOpponent.gameboard[square].isMiss = true;

      PlayerAttack.attack(square);

      expect(Opponent.gameboard[square].isMiss).toBe(true);
    });
  });
});
