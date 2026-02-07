import { describe, it, expect, beforeEach } from 'vitest';
import type { gameBoardInterface } from '~/utils/gameBoard';
import gameBoard from '~/utils/gameBoard';
import type { shipInterface } from '~/utils/ship';
import ship from '~/utils/ship';

describe('GameBoard', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let Player: gameBoardInterface;
  let Opponent: gameBoardInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    Player = gameBoard(shipsArray);
    Opponent = gameBoard(shipsArray);
  });

  describe('isWinner', () => {
    it('will declare a winner if all ships are sunk', () => {
      Opponent.props.allShips[0].props.sunk = true;
      Opponent.props.allShips[1].props.sunk = true;
      Opponent.props.allShips[2].props.sunk = true;
      Opponent.props.allShips[3].props.sunk = true;
      Opponent.props.allShips[4].props.sunk = true;

      Player.isWinner(Opponent);

      expect(Player.props.winner).toBe(true);
    });
  });
});
