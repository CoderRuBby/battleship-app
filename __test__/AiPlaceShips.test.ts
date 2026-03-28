import { describe, it, beforeEach, expect } from 'vitest';
import type { aiShipPlacementSystemInterface } from '~/utils/aiShipPlacementSystem';
import aiShipPlacementSystem from '~/utils/aiShipPlacementSystem';
import { createPlayer2 } from './testData';

describe('AiPlaceShips', () => {
  let Ai: ReturnType<typeof createPlayer2>;
  let AiPlayerPlaceShips: aiShipPlacementSystemInterface;

  beforeEach(() => {
    Ai = createPlayer2();
    AiPlayerPlaceShips = aiShipPlacementSystem();
  });

  describe('randomSquare', () => {
    it('will not return a square that has a ship placed', () => {
      const testSquare = 45;

      Ai.board[testSquare].ship = Ai.props.allShips[0];
      Ai.props.selectedShip = Ai.props.allShips[0];

      const randomSquare = AiPlayerPlaceShips.randomSquare(100, Ai, testSquare);

      expect(randomSquare).not.toBe(testSquare);
    });
  });

  describe('placeShipOnGameboard', () => {
    it('can place all ships on the gameboard', () => {
      AiPlayerPlaceShips.placeShipOnGameBoard(Ai);

      expect(Ai.props.allShipsPlaced).toBe(true);
      expect(Number.isInteger(Ai.props.allShips[0].props.shipStartPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[0].props.shipEndPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[1].props.shipStartPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[1].props.shipEndPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[2].props.shipStartPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[2].props.shipEndPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[3].props.shipStartPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[3].props.shipEndPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[4].props.shipStartPoint)).toBe(
        true,
      );
      expect(Number.isInteger(Ai.props.allShips[4].props.shipEndPoint)).toBe(
        true,
      );
    });
  });
});
