import { describe, it, expect, beforeEach } from 'vitest';
import AiGameBoard from '~/utils/ai-gameboard';

describe('AiGameboard', () => {
  let Ai: AiGameBoard;

  beforeEach(() => {
    Ai = new AiGameBoard();
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
      Ai.aiTurn();

      expect(Ai.allShipsPlaced).toBe(true);
    });
  });
});
