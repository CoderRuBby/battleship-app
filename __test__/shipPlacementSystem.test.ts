import { act, renderHook } from '@testing-library/react';
import { describe, it, beforeEach, expect, test } from 'vitest';
import type { shipPlacementSystemInterface } from '~/utils/shipPlacementSystem';
import shipPlacementSystem from '~/utils/shipPlacementSystem';
import { createPlayer1 } from './testData';
import type { shipInterface } from '~/utils/ship';

describe('shipPlacementSystem', () => {
  let player1: ReturnType<typeof createPlayer1>;
  let ship1: shipInterface;
  let ship2: shipInterface;
  let placementSystem: shipPlacementSystemInterface;

  beforeEach(() => {
    player1 = createPlayer1();
    ship1 = player1.props.allShips[1];
    ship2 = player1.props.allShips[2];
    placementSystem = shipPlacementSystem();
  });

  describe('possibleShipEndPoints', () => {
    it('can output 4 endpoints', () => {
      const shipLength = 3;
      const shipStartPoint = 45;

      expect(
        placementSystem.possibleShipEndPoints(
          shipStartPoint,
          shipLength,
          player1,
        ),
      ).toEqual([47, 43, 65, 25]);
    });

    it('can correctly output 2 endpoints', () => {
      const shipLength = 2;
      const shipStartPoint = 0;

      expect(
        placementSystem.possibleShipEndPoints(
          shipStartPoint,
          shipLength,
          player1,
        ),
      ).toEqual([1, 10]);
    });

    it('will not output used endPoints', () => {
      player1.board[0].ship = ship1;
      player1.board[1].ship = ship1;
      player1.board[2].ship = ship1;

      const shipLength = 4;
      const shipStartPoint = 4;

      expect(
        placementSystem.possibleShipEndPoints(
          shipStartPoint,
          shipLength,
          player1,
        ),
      ).toEqual([7, 34]);
    });
  });

  describe('possibleShipPath', () => {
    it('can output ship path', () => {
      const shipLength = 2;
      const shipStartPoint = 0;
      const shipEndPoint = 1;

      expect(
        placementSystem.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
          player1,
        ).array,
      ).toEqual([0, 1]);
    });

    it('will return an empty array if any square in path is used', () => {
      player1.board[4].ship = ship1;
      player1.board[14].ship = ship1;
      player1.board[24].ship = ship1;

      const shipLength = 3;
      const shipStartPoint = 4;
      const shipEndPoint = 24;

      expect(
        placementSystem.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
          player1,
        ).array,
      ).toEqual([]);
    });
  });

  describe('getShipPaths', () => {
    it('can output all ship paths', () => {
      const shipLength = 3;
      const shipStartPoint = 0;

      expect(
        placementSystem.getShipPaths(shipLength, shipStartPoint, player1)[0]
          .array,
      ).toEqual([0, 1, 2]);
      expect(
        placementSystem.getShipPaths(shipLength, shipStartPoint, player1)[1]
          .array,
      ).toEqual([0, 10, 20]);
    });

    it('will output available paths only', () => {
      player1.board[25].ship = ship1;
      player1.board[35].ship = ship1;

      player1.board[27].ship = ship2;
      player1.board[37].ship = ship2;
      player1.board[47].ship = ship2;

      const shipLength = 4;
      const shipStartPoint = 26;

      expect(
        placementSystem.getShipPaths(shipLength, shipStartPoint, player1)[0]
          .array,
      ).toEqual([26, 36, 46, 56]);
    });
  });

  describe('selectShip', () => {
    it('can select a ship', () => {
      expect(placementSystem.selectShip(ship1, null)).toEqual(ship1);
    });

    it('can deselect the ship if clicked again', () => {
      expect(placementSystem.selectShip(ship1, null)).toEqual(ship1);
      expect(placementSystem.selectShip(ship1, ship1)).toEqual(null);
    });

    it('can select a different ship', () => {
      expect(placementSystem.selectShip(ship1, null)).toEqual(ship1);
      expect(placementSystem.selectShip(ship2, ship1)).toEqual(ship2);
    });

    test('de-selecting a ship will clear shipStartPoint', () => {
      const shipStartPoint = 45;
      placementSystem.selectShip(ship1, null);
      ship1.addShipStart(shipStartPoint);

      expect(ship1.props.shipStartPoint).toBe(45);
      expect(placementSystem.selectShip(ship1, ship1)).toBe(null);
      expect(ship1.props.shipStartPoint).toBe(null);
    });

    test('selecting a different ship will clear old ship shipStartPoint', () => {
      const shipStartPoint = 45;
      placementSystem.selectShip(ship1, null);
      ship1.addShipStart(shipStartPoint);
      placementSystem.selectShip(ship2, ship1);

      expect(ship1.props.shipStartPoint).toBe(null);
    });
  });

  describe('shipPlacementLogic', () => {
    beforeEach(() => {
      player1.props.selectedShip = ship1;
    });

    it('will assign shipStartPoint if ship is selected', () => {
      const shipStartPoint = 0;

      placementSystem.shipPlacementLogic(shipStartPoint, player1);

      expect(ship1.props.shipStartPoint).toEqual(0);
    });

    it('will assign shipEndPoint if shipStartPoint is assigned', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, player1);
      placementSystem.shipPlacementLogic(shipEndPoint, player1);

      expect(ship1.props.shipEndPoint).toBe(20);
    });

    it('will place ship on gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, player1);
      placementSystem.shipPlacementLogic(shipEndPoint, player1);

      expect(player1.board[0].ship).toEqual(ship1);
      expect(player1.board[10].ship).toEqual(ship1);
      expect(player1.board[20].ship).toEqual(ship1);
    });

    it('will reset selectedShip after ship is placed', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, player1);

      expect(
        placementSystem.shipPlacementLogic(shipEndPoint, player1).props
          .selectedShip,
      ).toBe(null);
    });

    it('will not assign shipStartPoint if already being used', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;

      placementSystem.shipPlacementLogic(shipStartPoint, player1);
      placementSystem.shipPlacementLogic(shipEndPoint, player1);

      placementSystem.shipPlacementLogic(shipStartPoint, player1);

      expect(player1.board[0].ship).toEqual(ship1);
      expect(ship2.props.shipStartPoint).toBe(null);
    });

    it('will not place a ship in the same location', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, player1);
      placementSystem.shipPlacementLogic(shipEndPoint, player1);

      const shipStartPoint2 = 12;
      const shipEndPoint2 = 10;

      placementSystem.shipPlacementLogic(shipStartPoint2, player1);
      placementSystem.shipPlacementLogic(shipEndPoint2, player1);

      expect(player1.board[0].ship).toEqual(ship1);
      expect(player1.board[10].ship).toEqual(ship1);
    });
  });

  describe('placeShipOnGameBoard', () => {
    it('can place a ship on the gameboard', () => {
      const { result } = renderHook(() => shipPlacementSystem());
      const shipStartPoint = 0;
      const shipEndPoint = 2;

      act(() => {
        result.current.placeShipOnGameBoard(
          ship1,
          shipStartPoint,
          shipEndPoint,
          player1,
        );
      });

      expect(player1.board[0].ship).toEqual(ship1);
      expect(player1.board[1].ship).toEqual(ship1);
      expect(player1.board[2].ship).toEqual(ship1);
    });

    it('will not place a ship in un-available locations', () => {
      const { result } = renderHook(() => shipPlacementSystem());
      player1.board[4].ship = ship1;
      player1.board[5].ship = ship1;
      player1.board[6].ship = ship1;

      const shipStartPoint = 4;
      const shipEndPoint = 7;

      act(() => {
        result.current.placeShipOnGameBoard(
          ship2,
          shipStartPoint,
          shipEndPoint,
          player1,
        );
      });

      expect(player1.board[4].ship).toEqual(ship1);
      expect(player1.board[5].ship).toEqual(ship1);
      expect(player1.board[6].ship).toEqual(ship1);
      expect(player1.board[7].ship).toBe(null);
    });

    test('all ships can be placed on the gameboard', () => {
      const carrier = player1.props.allShips[0];
      const destroyer = player1.props.allShips[1];
      const submarine = player1.props.allShips[2];
      const battleship = player1.props.allShips[3];
      const cruiser = player1.props.allShips[4];
      const { result } = renderHook(() => shipPlacementSystem());

      act(() => {
        result.current.placeShipOnGameBoard(carrier, 0, 40, player1);
      });

      act(() => {
        result.current.placeShipOnGameBoard(destroyer, 6, 8, player1);
      });

      act(() => {
        result.current.placeShipOnGameBoard(submarine, 34, 32, player1);
      });

      act(() => {
        result.current.placeShipOnGameBoard(battleship, 85, 88, player1);
      });

      act(() => {
        result.current.placeShipOnGameBoard(cruiser, 98, 99, player1);
      });

      expect(player1.props.allShipsPlaced).toBe(true);
    });
  });
});
