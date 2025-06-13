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

  describe('placeShipOnGameboard', () => {
    it('can place all ships on the gameboard', () => {
      Ai.placeShipOnGameBoard();

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Number.isInteger(Ai.Carrier.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Carrier.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Battleship.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Battleship.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Destroyer.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Destroyer.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Submarine.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Submarine.shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.Cruiser.shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.Cruiser.shipEndPoint)).toBe(true);
    });
  });

  describe('getAdjacentSquares', () => {
    it('will return [22, 24, 33, 13], adjacent square to 23', () => {
      const attackedSquare = 23;
      const adjacentSquares = [22, 24, 33, 13];

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
    });

    it('will return [1, 10], adjacent square to 0', () => {
      const attackedSquare = 0;
      const adjacentSquares = [1, 10];

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
      expect(Ai.getAdjacentSquares(attackedSquare, Player)).not.toContain(-1);
      expect(Ai.getAdjacentSquares(attackedSquare, Player)).not.toContain(-10);
    });

    it('will not return squares that have been hit', () => {
      Player.gameboard[57].isHit = true;

      const attackedSquare = 56;
      const adjacentSquares = [55, 66, 46];

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
      expect(Ai.getAdjacentSquares(attackedSquare, Player)).not.toContain(57);
    });

    it('will return squares that have an opponents ship, not hit', () => {
      const attackedSquare = 55;
      const adjacentSquares = [54, 56, 65, 45];

      Player.gameboard[56].ship = Player.Battleship;

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
    });
  });

  describe('turn', () => {
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
  });
});
