import { describe, it, beforeEach, expect } from 'vitest';
import type { aiShipPlacementSystemInterface } from '~/utils/aiShipPlacementSystem';
import aiShipPlacementSystem from '~/utils/aiShipPlacementSystem';
import type { gameBoardInterface } from '~/utils/GameBoard';
import gameBoard from '~/utils/GameBoard';
import type { shipInterface } from '~/utils/Ship';
import ship from '~/utils/Ship';

describe('AiPlaceShips', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let Ai: gameBoardInterface;
  let AiPlayerPlaceShips: aiShipPlacementSystemInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    Ai = gameBoard(shipsArray);
    AiPlayerPlaceShips = aiShipPlacementSystem(Ai);
  });

  describe('randomSquare', () => {
    it('will not return a square that has a ship placed', () => {
      const testSquare = 45;

      Ai.board[testSquare].ship = Ai.allShips[0];
      Ai.selectedShip = Ai.allShips[0];

      const randomSquare = AiPlayerPlaceShips.randomSquare(100, testSquare);

      expect(randomSquare).not.toBe(testSquare);
    });
  });

  describe('placeShipOnGameboard', () => {
    it('can place all ships on the gameboard', () => {
      AiPlayerPlaceShips.placeShipOnGameBoard();

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Number.isInteger(Ai.allShips[0].shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[0].shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[1].shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[1].shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[2].shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[2].shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[3].shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[3].shipEndPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[4].shipStartPoint)).toBe(true);
      expect(Number.isInteger(Ai.allShips[4].shipEndPoint)).toBe(true);
    });
  });
});
