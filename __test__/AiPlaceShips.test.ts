import { describe, it, beforeEach, expect } from 'vitest';
import type { aiShipPlacementSystemInterface } from '~/utils/aiShipPlacementSystem';
import aiShipPlacementSystem from '~/utils/aiShipPlacementSystem';
import type { gameBoardInterface } from '~/utils/gameBoard';
import gameBoard from '~/utils/gameBoard';
import type { shipInterface } from '~/utils/ship';
import ship from '~/utils/ship';

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

      Ai.board[testSquare].ship = Ai.props.allShips[0];
      Ai.props.selectedShip = Ai.props.allShips[0];

      const randomSquare = AiPlayerPlaceShips.randomSquare(100, testSquare);

      expect(randomSquare).not.toBe(testSquare);
    });
  });

  describe('placeShipOnGameboard', () => {
    it('can place all ships on the gameboard', () => {
      AiPlayerPlaceShips.placeShipOnGameBoard();

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
