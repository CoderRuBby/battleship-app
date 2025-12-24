import { act, renderHook } from '@testing-library/react';
import { describe, it, beforeEach, expect, test } from 'vitest';
import gameBoard from '~/utils/GameBoard';
import type { gameBoardInterface } from '~/utils/GameBoard';
import type { shipPlacementSystemInterface } from '~/utils/shipPlacementSystem';
import shipPlacementSystem from '~/utils/shipPlacementSystem';
import ship from '~/utils/Ship';
import type { shipInterface } from '~/utils/Ship';

describe('shipPlacementSystem', () => {
  let Player: gameBoardInterface;
  let Ship1: shipInterface;
  let Ship2: shipInterface;
  let placementSystem: shipPlacementSystemInterface;

  beforeEach(() => {
    Ship1 = ship('foo', 3);
    Ship2 = ship('bar', 2);
    const ships = [Ship1, Ship2];
    Player = gameBoard(ships);
    placementSystem = shipPlacementSystem(Player);
  });

  describe('possibleShipEndPoints', () => {
    it('can output 4 endpoints', () => {
      const shipLength = 3;
      const shipStartPoint = 45;

      expect(
        placementSystem.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([47, 43, 65, 25]);
    });

    it('can correctly output 2 endpoints', () => {
      const shipLength = 2;
      const shipStartPoint = 0;

      expect(
        placementSystem.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([1, 10]);
    });

    it('will not output used endPoints', () => {
      Player.board[0].ship = Ship1;
      Player.board[1].ship = Ship1;
      Player.board[2].ship = Ship1;

      const shipLength = 4;
      const shipStartPoint = 4;

      expect(
        placementSystem.possibleShipEndPoints(shipStartPoint, shipLength),
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
        ).array,
      ).toEqual([0, 1]);
    });

    it('will return an empty array if any square in path is used', () => {
      Player.board[4].ship = Ship1;
      Player.board[14].ship = Ship1;
      Player.board[24].ship = Ship1;

      const shipLength = 3;
      const shipStartPoint = 4;
      const shipEndPoint = 24;

      expect(
        placementSystem.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
        ).array,
      ).toEqual([]);
    });
  });

  describe('getShipPaths', () => {
    it('can output all ship paths', () => {
      const shipLength = 3;
      const shipStartPoint = 0;

      expect(
        placementSystem.getShipPaths(shipLength, shipStartPoint)[0].array,
      ).toEqual([0, 1, 2]);
      expect(
        placementSystem.getShipPaths(shipLength, shipStartPoint)[1].array,
      ).toEqual([0, 10, 20]);
    });

    it('will output available paths only', () => {
      Player.board[25].ship = Ship1;
      Player.board[35].ship = Ship1;

      Player.board[27].ship = Ship2;
      Player.board[37].ship = Ship2;
      Player.board[47].ship = Ship2;

      const shipLength = 4;
      const shipStartPoint = 26;

      expect(
        placementSystem.getShipPaths(shipLength, shipStartPoint)[0].array,
      ).toEqual([26, 36, 46, 56]);
    });
  });

  describe('selectShip', () => {
    it('can select a ship', () => {
      expect(placementSystem.selectShip(Ship1, null)).toEqual(Ship1);
    });

    it('can deselect the ship if clicked again', () => {
      expect(placementSystem.selectShip(Ship1, null)).toEqual(Ship1);
      expect(placementSystem.selectShip(Ship1, Ship1)).toEqual(null);
    });

    it('can select a different ship', () => {
      expect(placementSystem.selectShip(Ship1, null)).toEqual(Ship1);
      expect(placementSystem.selectShip(Ship2, Ship1)).toEqual(Ship2);
    });

    test('de-selecting a ship will clear shipStartPoint', () => {
      const shipStartPoint = 45;
      placementSystem.selectShip(Ship1, null);
      Ship1.addShipStart(shipStartPoint);

      expect(Ship1.shipStartPoint).toBe(45);
      expect(placementSystem.selectShip(Ship1, Ship1)).toBe(null);
      expect(Ship1.shipStartPoint).toBe(null);
    });

    test('selecting a different ship will clear old ship shipStartPoint', () => {
      const shipStartPoint = 45;
      placementSystem.selectShip(Ship1, null);
      Ship1.addShipStart(shipStartPoint);

      placementSystem.selectShip(Ship2, Ship1);

      expect(Ship1.shipStartPoint).toBe(null);
    });
  });

  describe('shipPlacementLogic', () => {
    it('will assign shipStartPoint if ship is selected', () => {
      const shipStartPoint = 0;

      placementSystem.shipPlacementLogic(shipStartPoint, Ship1);

      expect(Ship1.shipStartPoint).toEqual(0);
    });

    it('will assign shipEndPoint if shipStartPoint is assigned', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, Ship1);
      placementSystem.shipPlacementLogic(shipEndPoint, Ship1);

      expect(Ship1.shipEndPoint).toBe(20);
    });

    it('will place ship on gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, Ship1);
      placementSystem.shipPlacementLogic(shipEndPoint, Ship1);

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Player.board[10].ship).toEqual(Ship1);
      expect(Player.board[20].ship).toEqual(Ship1);
    });

    it('will reset selectedShip after ship is placed', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, Ship1);

      expect(placementSystem.shipPlacementLogic(shipEndPoint, Ship1)).toBe(
        null,
      );
    });

    it('will not assign shipStartPoint if already being used', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;

      placementSystem.shipPlacementLogic(shipStartPoint, Ship1);
      placementSystem.shipPlacementLogic(shipEndPoint, Ship1);

      placementSystem.shipPlacementLogic(shipStartPoint, Ship2);

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Ship2.shipStartPoint).toBe(null);
    });

    it('will not place a ship in the same location', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      placementSystem.shipPlacementLogic(shipStartPoint, Ship1);
      placementSystem.shipPlacementLogic(shipEndPoint, Ship1);

      const shipStartPoint2 = 12;
      const shipEndPoint2 = 10;

      placementSystem.shipPlacementLogic(shipStartPoint2, Ship2);
      placementSystem.shipPlacementLogic(shipEndPoint2, Ship2);

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Player.board[10].ship).toEqual(Ship1);
    });
  });

  describe('placeShipOnGameBoard', () => {
    it('can place a ship on the gameboard', () => {
      const { result } = renderHook(() => shipPlacementSystem(Player));
      const shipStartPoint = 0;
      const shipEndPoint = 2;

      act(() => {
        result.current.placeShipOnGameBoard(
          Ship1,
          shipStartPoint,
          shipEndPoint,
        );
      });

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Player.board[1].ship).toEqual(Ship1);
      expect(Player.board[2].ship).toEqual(Ship1);
    });

    it('will not place a ship in un-available locations', () => {
      const { result } = renderHook(() => shipPlacementSystem(Player));
      Player.board[4].ship = Ship1;
      Player.board[5].ship = Ship1;
      Player.board[6].ship = Ship1;

      const shipStartPoint = 4;
      const shipEndPoint = 7;

      act(() => {
        result.current.placeShipOnGameBoard(
          Ship2,
          shipStartPoint,
          shipEndPoint,
        );
      });

      expect(Player.board[4].ship).toEqual(Ship1);
      expect(Player.board[5].ship).toEqual(Ship1);
      expect(Player.board[6].ship).toEqual(Ship1);
      expect(Player.board[7].ship).toBe(null);
    });

    test('all ships can be placed on the gameboard', () => {
      const { result } = renderHook(() => shipPlacementSystem(Player));
      act(() => {
        result.current.placeShipOnGameBoard(Ship1, 0, 20);
      });
      act(() => {
        result.current.placeShipOnGameBoard(Ship2, 6, 7);
      });
      expect(Player.allShipsPlaced).toBe(true);
    });
  });
});
