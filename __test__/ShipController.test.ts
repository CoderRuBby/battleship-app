import { describe, it, beforeEach, expect, test } from 'vitest';
import type { ShipControllerType } from '~/utils/ShipController';
import { ShipController } from '~/utils/ShipController';
import type { GameBoardType } from '~/utils/GameBoard';
import { GameBoard } from '~/utils/GameBoard';
import type { ShipType } from '~/utils/Ship';
import { Ship } from '~/utils/Ship';

describe('ShipController', () => {
  let Ship1: ShipType;
  let Ship2: ShipType;
  let Player: GameBoardType;
  let PlayerPlaceShip: ShipControllerType;

  beforeEach(() => {
    Ship1 = Ship('foo', 3);
    Ship2 = Ship('bar', 2);
    Player = GameBoard([Ship1, Ship2]);
    Player.initialize();
    PlayerPlaceShip = ShipController(Player);
  });

  describe('possibleShipEndPoints', () => {
    it('can output 4 endpoints', () => {
      const shipLength = 3;
      const shipStartPoint = 45;

      expect(
        PlayerPlaceShip.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([47, 43, 65, 25]);
    });

    it('can correctly output 2 endpoints', () => {
      const shipLength = 2;
      const shipStartPoint = 0;

      expect(
        PlayerPlaceShip.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([1, 10]);
    });

    it('will not output used endPoints', () => {
      Player.board[0].ship = Ship1;
      Player.board[1].ship = Ship1;
      Player.board[2].ship = Ship1;

      const shipLength = 4;
      const shipStartPoint = 4;

      expect(
        PlayerPlaceShip.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([7, 34]);
    });
  });

  describe('possibleShipPath', () => {
    it('can output ship path', () => {
      const shipLength = 2;
      const shipStartPoint = 0;
      const shipEndPoint = 1;

      expect(
        PlayerPlaceShip.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
        ),
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
        PlayerPlaceShip.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
        ),
      ).toEqual([]);
    });
  });

  describe('getShipPaths', () => {
    it('can output all ship paths', () => {
      const shipLength = 3;
      const shipStartPoint = 0;

      expect(PlayerPlaceShip.getShipPaths(shipLength, shipStartPoint)).toEqual([
        [0, 1, 2],
        [0, 10, 20],
      ]);
    });

    it('will output available paths only', () => {
      Player.board[25].ship = Ship1;
      Player.board[35].ship = Ship1;

      Player.board[27].ship = Ship2;
      Player.board[37].ship = Ship2;
      Player.board[47].ship = Ship2;

      const shipLength = 4;
      const shipStartPoint = 26;

      expect(PlayerPlaceShip.getShipPaths(shipLength, shipStartPoint)).toEqual([
        [26, 36, 46, 56],
      ]);
    });
  });

  describe('selectShip', () => {
    it('can select a ship', () => {
      PlayerPlaceShip.selectShip(Ship1);

      expect(Player.selectedShip).toEqual(Ship1);
    });

    it('can deselect the ship if clicked again', () => {
      PlayerPlaceShip.selectShip(Ship1);

      expect(Player.selectedShip).toEqual(Ship1);

      PlayerPlaceShip.selectShip(Ship1);

      expect(Player.selectedShip).toEqual(null);
    });

    it('can select a different ship', () => {
      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.selectShip(Ship2);

      expect(Player.selectedShip).toEqual(Ship2);
    });

    test('de-selecting a ship will clear shipStartPoint', () => {
      const shipStartPoint = 45;

      PlayerPlaceShip.selectShip(Ship1);
      Ship1.addShipStart(shipStartPoint);
      PlayerPlaceShip.selectShip(Ship1);

      expect(Ship1.shipStartPoint).toBe(null);
    });

    test('selecting a different ship will clear old ship shipStartPoint', () => {
      const shipStartPoint = 45;

      PlayerPlaceShip.selectShip(Ship1);
      Ship1.addShipStart(shipStartPoint);
      PlayerPlaceShip.selectShip(Ship2);

      expect(Ship1.shipStartPoint).toBe(null);
    });
  });

  describe('shipPlacementLogic', () => {
    it('will assign shipStartPoint if ship is selected', () => {
      const shipStartPoint = 0;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint);

      expect(Ship1.shipStartPoint).toEqual(0);
    });

    it('will assign shipEndPoint if shipStartPoint is assigned', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint);
      PlayerPlaceShip.shipPlacementLogic(shipEndPoint);
      expect(Ship1.shipEndPoint).toBe(20);
    });

    it('will place ship on gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint);
      PlayerPlaceShip.shipPlacementLogic(shipEndPoint);

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Player.board[10].ship).toEqual(Ship1);
      expect(Player.board[20].ship).toEqual(Ship1);
    });

    it('will reset selectedShip after ship is placed', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      PlayerPlaceShip.selectShip(Ship2);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint);
      PlayerPlaceShip.shipPlacementLogic(shipEndPoint);

      expect(Player.selectedShip).toBe(null);
    });

    it('will not assign shipStartPoint if already being used', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint);
      PlayerPlaceShip.shipPlacementLogic(shipEndPoint);

      PlayerPlaceShip.selectShip(Ship2);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint);

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Ship2.shipStartPoint).toBe(null);
    });

    it('will not place a ship in the same location', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint);
      PlayerPlaceShip.shipPlacementLogic(shipEndPoint);

      const shipStartPoint2 = 12;
      const shipEndPoint2 = 10;

      PlayerPlaceShip.selectShip(Ship2);
      PlayerPlaceShip.shipPlacementLogic(shipStartPoint2);
      PlayerPlaceShip.shipPlacementLogic(shipEndPoint2);

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Player.board[10].ship).toEqual(Ship1);
    });
  });

  describe('placeShipOnGameBoard', () => {
    it('can place a ship on the gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;

      PlayerPlaceShip.placeShipOnGameBoard(Ship1, shipStartPoint, shipEndPoint);

      expect(Player.board[0].ship).toEqual(Ship1);
      expect(Player.board[1].ship).toEqual(Ship1);
      expect(Player.board[2].ship).toEqual(Ship1);
    });

    it('will not place a ship in un-available locations', () => {
      Player.board[4].ship = Ship1;
      Player.board[5].ship = Ship1;
      Player.board[6].ship = Ship1;

      const shipStartPoint = 4;
      const shipEndPoint = 7;

      PlayerPlaceShip.placeShipOnGameBoard(Ship2, shipStartPoint, shipEndPoint);

      expect(Player.board[4].ship).toEqual(Ship1);
      expect(Player.board[5].ship).toEqual(Ship1);
      expect(Player.board[6].ship).toEqual(Ship1);
      expect(Player.board[7].ship).toBe(null);
    });

    test('all ships can be placed on the gameboard', () => {
      const shipStartPoint = 30;
      const shipEndPoint = 31;

      PlayerPlaceShip.placeShipOnGameBoard(Ship2, shipStartPoint, shipEndPoint);

      const secondShipStartPoint = 4;
      const secondShipEndPoint = 7;

      PlayerPlaceShip.placeShipOnGameBoard(
        Ship2,
        secondShipStartPoint,
        secondShipEndPoint,
      );

      expect(Player.allShipsPlaced).toBe(true);
    });
  });
});
