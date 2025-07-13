import { describe, it, expect, beforeEach } from 'vitest';
import GamePlay from '~/utils/GamePlay';
import GameBoard from '~/utils/GameBoard';
import AiGameBoard from '~/utils/AiGameBoard';

describe.skip('GamePlay', () => {
  let Ai: AiGameBoard;
  let Player: GameBoard;
  let Game: GamePlay;

  beforeEach(() => {
    Ai = new AiGameBoard();
    Player = new GameBoard();
    Game = new GamePlay(Player, Ai);
  });

  describe('isWinner', () => {
    it('will return true if there is a winner', () => {
      Player.winner = true;
      const winner = Game.isWinner();

      expect(winner).toBe(true);
    });

    it('will return false if there is no winner', () => {
      const winner = Game.isWinner();

      expect(winner).toBe(false);
    });
  });

  describe('turn', () => {
    it('can let both players place ships on gameboard', () => {
      Player.selectedShip = Player.Battleship;
      Game.turn(45);
      Game.turn(48);
      Player.selectedShip = Player.Carrier;
      Game.turn(34);
      Game.turn(38);
      Player.selectedShip = Player.Cruiser;
      Game.turn(77);
      Game.turn(79);
      Player.selectedShip = Player.Destroyer;
      Game.turn(20);
      Game.turn(21);
      Player.selectedShip = Player.Submarine;
      Game.turn(63);
      //! occasionally gets error: this.possibleShipEndPoints is not a function
      Game.turn(65);

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Player.allShipsPlaced).toBe(true);
    });

    it('can let both players attack', () => {
      const attackSquare = 45;
      Player.allShipsPlaced = true;
      Ai.allShipsPlaced = true;

      Game.turn(attackSquare);

      const playerWasAttacked = Object.values(Player.gameboard).some(
        (square) => square.isMiss || square.isHit,
      );

      expect(Ai.gameboard[attackSquare].isMiss).toBe(true);
      expect(playerWasAttacked).toBe(true);
    });

    it('can prevent further game turns if there is a winner', () => {
      const square = 45;
      Player.winner = true;

      Game.turn(square);

      expect(Ai.gameboard[square].isMiss).toBe(false);
    });
  });
});
