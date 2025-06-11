import { describe, it, expect, beforeEach } from 'vitest';
import AiGameBoard from '~/utils/ai-gameboard';
import GameBoard from '~/utils/gameboard-object';

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
