import { describe, it, expect, beforeEach } from 'vitest';
import type { gameBoardInterface } from '~/utils/GameBoard';
import gameBoard from '~/utils/GameBoard';
import type { shipInterface } from '~/utils/Ship';
import ship from '~/utils/Ship';
import type { gamePlayInterface } from '~/utils/gameplay';
import gamePlay from '~/utils/gameplay';

describe('GamePlay', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let Ai: gameBoardInterface;
  let Player: gameBoardInterface;
  let Game: gamePlayInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    Ai = gameBoard(shipsArray);
    Player = gameBoard(shipsArray);
    Game = gamePlay();
  });

  describe('isWinner', () => {
    it('will return true if there is a winner', () => {
      Player.winner = true;
      const winner = Game.isWinner(Player, Ai);

      expect(winner).toBe(true);
    });

    it('will return false if there is no winner', () => {
      const winner = Game.isWinner(Player, Ai);

      expect(winner).toBe(false);
    });
  });

  describe('aiTurn', () => {
    it('will place ships on gameboard for the first turn', () => {
      Game.aiTurn(Ai);

      expect(Ai.allShipsPlaced).toBe(true);
    });

    it('will attack opponents gameboard after ships have been placed', () => {
      const square = 45;
      const square2 = 74;
      Player.board[square2].ship = Player.allShips[0];

      Game.aiTurn(Ai);
      Game.aiTurn(Ai, Player, square);
      Game.aiTurn(Ai, Player, square2);

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Player.board[square].isMiss).toBe(true);
      expect(Player.board[square2].isHit).toBe(true);
    });
  });

  describe('turn', () => {
    it('can let both players place ships on gameboard', () => {
      Player.selectedShip = Player.allShips[0];
      Game.turn(34, Player, Ai);
      Game.turn(38, Player, Ai);
      Player.selectedShip = Player.allShips[1];
      Game.turn(20, Player, Ai);
      Game.turn(21, Player, Ai);
      Player.selectedShip = Player.allShips[2];
      Game.turn(63, Player, Ai);
      Game.turn(65, Player, Ai);
      Player.selectedShip = Player.allShips[3];
      Game.turn(45, Player, Ai);
      Game.turn(48, Player, Ai);
      Player.selectedShip = Player.allShips[4];
      Game.turn(77, Player, Ai);
      Game.turn(79, Player, Ai);

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Player.allShipsPlaced).toBe(true);
    });

    it('can let both players attack', () => {
      const attackSquare = 45;
      Player.allShipsPlaced = true;
      Ai.allShipsPlaced = true;

      Game.turn(attackSquare, Player, Ai);

      const playerWasAttacked = Object.values(Player.board).some(
        (square) => square.isMiss || square.isHit,
      );

      expect(Ai.board[attackSquare].isMiss).toBe(true);
      expect(playerWasAttacked).toBe(true);
    });

    it('can prevent further game turns if there is a winner', () => {
      const square = 45;
      Player.winner = true;

      Game.turn(square, Player, Ai);

      expect(Ai.board[square].isMiss).toBe(false);
    });
  });
});
