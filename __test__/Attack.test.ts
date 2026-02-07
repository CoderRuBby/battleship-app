import { describe, it, beforeEach, expect } from 'vitest';
import type { attackInterface } from '~/utils/Attack';
import attack from '~/utils/Attack';
import type { gameBoardInterface } from '~/utils/GameBoard';
import gameBoard from '~/utils/GameBoard';
import type { shipInterface } from '~/utils/Ship';
import ship from '~/utils/Ship';

describe('Attack', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let Opponent: gameBoardInterface;
  let PlayerAttack: attackInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    Opponent = gameBoard(shipsArray);
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
