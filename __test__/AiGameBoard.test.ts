import { describe, it, expect, beforeEach } from 'vitest';
import AiGameBoard from '~/utils/AiGameBoard';
import GameBoard from '~/utils/GameBoard';

describe('AiGameboard', () => {
  let Ai: AiGameBoard;
  let Player: GameBoard;

  beforeEach(() => {
    Ai = new AiGameBoard();
    Player = new GameBoard();
  });

  describe('placeShips', () => {
    it('can place all ships on game board', () => {
      Ai.placeAll();

      expect(Ai.allShipsPlaced).toBe(true);
    });
  });

  describe('attack', () => {
    it('attacks Player location which can result in a miss', () => {
      const attackLocation = Ai.attack(Player);

      expect(Player.gameboard[attackLocation].isMiss).toBe(true);
      expect(Player.gameboard[attackLocation].isHit).toBe(false);
    });

    it('attacks Player location which can result in a hit', () => {
      const attackLocation = 45;

      Player.gameboard[attackLocation].ship = Player.Battleship;

      Ai.attack(Player, attackLocation);

      expect(Player.gameboard[attackLocation].isHit).toBe(true);
      expect(Player.gameboard[attackLocation].isMiss).toBe(false);
    });
  });

  describe.skip('turn', () => {
    it('will place ships on gameboard for the first turn', () => {
      Ai.turn();

      expect(Ai.allShipsPlaced).toBe(true);
    });

    it('will attack opponents gameboard after ships have been placed', () => {
      const square = 45;
      const square2 = 74;
      Player.gameboard[square2].ship = Player.Battleship;

      Ai.turn();
      Ai.turn(square, Player);
      Ai.turn(square2, Player);

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Player.gameboard[square].isMiss).toBe(true);
      expect(Player.gameboard[square2].isHit).toBe(true);
    });

    it('will attack adjacent squares after a ship has been hit', () => {
      const attackedSquare = 35;
      const adjacentSquares = [34, 36, 25, 45];

      Player.gameboard[attackedSquare].ship = Player.Battleship;

      Ai.turn();
      Ai.turn(attackedSquare, Player);
      Ai.turn(null, Player);

      const isAttacked = adjacentSquares.some(
        (square) =>
          Player.gameboard[square].isHit || Player.gameboard[square].isMiss,
      );

      expect(isAttacked).toBe(true);
    });
  });
});
