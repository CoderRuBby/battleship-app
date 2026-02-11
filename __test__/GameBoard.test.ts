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

  describe('reset', () => {
    it('will reset the board and props', () => {
      Player.board[45].imageDirection = 'up';
      Player.board[47].imageNumber = 2;
      Player.board[66].ship = Player.props.allShips[0];
      Player.board[87].isHit = true;
      Player.board[23].isMiss = true;
      Player.props.allShipsPlaced = true;
      Player.props.winner = true;
      Player.props.selectedShip = Player.props.allShips[0];
      Player.props.allShips[0].props.isPlaced = true;
      Player.props.allShips[1].props.isPlaced = true;
      Player.props.allShips[2].props.isPlaced = true;
      Player.props.allShips[3].props.isPlaced = true;
      Player.props.allShips[4].props.isPlaced = true;

      Player.reset();

      expect(Player.board[45].imageDirection).toBe(null);
      expect(Player.board[47].imageNumber).toBe(null);
      expect(Player.board[66].ship).toEqual(null);
      expect(Player.board[87].isHit).toBe(false);
      expect(Player.board[23].isMiss).toBe(false);
      expect(Player.props.allShipsPlaced).toBe(false);
      expect(Player.props.winner).toBe(false);
      expect(Player.props.selectedShip).toEqual(null);
    });
  });
});
