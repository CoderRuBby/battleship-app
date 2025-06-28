import { describe, it, beforeEach, expect } from 'vitest';
import AiPlaceShips from '~/utils/AiPlaceShips';
import AiGameBoard from '~/utils/AiGameBoard';

describe('AiPlaceShips', () => {
  let Ai: AiGameBoard;
  let AiPlayerPlaceShips: AiPlaceShips;

  beforeEach(() => {
    Ai = new AiGameBoard();
    AiPlayerPlaceShips = new AiPlaceShips(Ai);
  });

  describe('placeShipOnGameboard', () => {
    it('can place all ships on the gameboard', () => {
      AiPlayerPlaceShips.placeShipOnGameBoard();

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
});
