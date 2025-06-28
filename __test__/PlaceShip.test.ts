import { describe, it, beforeEach, expect, test } from 'vitest';
import PlaceShips from '~/utils/PlaceShips';
import GameBoard from '~/utils/GameBoard';
import Ship from '~/utils/Ship';

describe('PlaceShips', () => {
  let Player: GameBoard;
  let PlayerPlaceShip: PlaceShips;
  let Ship1: Ship;
  let Ship2: Ship;

  beforeEach(() => {
    Player = new GameBoard();
    PlayerPlaceShip = new PlaceShips(Player);
    Ship1 = new Ship('foo', 3);
    Ship2 = new Ship('bar', 2);
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
      Player.gameboard[0].ship = Ship1;
      Player.gameboard[1].ship = Ship1;
      Player.gameboard[2].ship = Ship1;

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
      Player.gameboard[4].ship = Ship1;
      Player.gameboard[14].ship = Ship1;
      Player.gameboard[24].ship = Ship1;

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
      Player.gameboard[25].ship = Ship1;
      Player.gameboard[35].ship = Ship1;

      Player.gameboard[27].ship = Ship2;
      Player.gameboard[37].ship = Ship2;
      Player.gameboard[47].ship = Ship2;

      const shipLength = 4;
      const shipStartPoint = 26;

      expect(PlayerPlaceShip.getShipPaths(shipLength, shipStartPoint)).toEqual([
        [26, 36, 46, 56],
      ]);
    });
  });

  describe('selectShip', () => {
    it('can select a ship', () => {
      const expectShip = new Ship('foo', 3);

      PlayerPlaceShip.selectShip(Ship1);

      expect(PlayerPlaceShip.selectedShip).toEqual(expectShip);
    });

    it('can deselect the ship if clicked again', () => {
      const expectShip = new Ship('foo', 3);

      PlayerPlaceShip.selectShip(Ship1);

      expect(PlayerPlaceShip.selectedShip).toEqual(expectShip);

      PlayerPlaceShip.selectShip(Ship1);

      expect(PlayerPlaceShip.selectedShip).toEqual(null);
    });

    it('can select a different ship', () => {
      const expectShip = new Ship('bar', 2);

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.selectShip(Ship2);

      expect(PlayerPlaceShip.selectedShip).toEqual(expectShip);
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

  //! Rename to assignPlacementPoints
  //! Only include following two tests
  describe('shipPlacement', () => {
    it('will assign shipStartPoint if ship is selected', () => {
      const shipStartPoint = 0;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacement(shipStartPoint);

      expect(Ship1.shipStartPoint).toEqual(0);
    });

    it('will assign shipEndPoint if shipStartPoint is assigned', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacement(shipStartPoint);
      PlayerPlaceShip.shipPlacement(shipEndPoint);
      expect(Ship1.shipEndPoint).toBe(20);
    });

    it('will place ship on gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      const expectShip = new Ship('foo', 3);

      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);
      expectShip.isPlaced = true;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacement(shipStartPoint);
      PlayerPlaceShip.shipPlacement(shipEndPoint);

      expect(Player.gameboard[0].ship).toEqual(expectShip);
      expect(Player.gameboard[10].ship).toEqual(expectShip);
      expect(Player.gameboard[20].ship).toEqual(expectShip);
    });

    it('will reset selectedShip after ship is placed', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      const expectShip = new Ship('bar', 3);

      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);

      PlayerPlaceShip.selectShip(Ship2);
      PlayerPlaceShip.shipPlacement(shipStartPoint);
      PlayerPlaceShip.shipPlacement(shipEndPoint);

      expect(PlayerPlaceShip.selectedShip).toBe(null);
    });

    it('will not assign shipStartPoint if already being used', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;
      const expectShip = new Ship('foo', 3);

      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);
      expectShip.isPlaced = true;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacement(shipStartPoint);
      PlayerPlaceShip.shipPlacement(shipEndPoint);

      PlayerPlaceShip.selectShip(Ship2);
      PlayerPlaceShip.shipPlacement(shipStartPoint);

      expect(Player.gameboard[0].ship).toEqual(expectShip);
      expect(Ship2.shipStartPoint).toBe(null);
    });

    it('will not place a ship in the same location', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 20;
      const expectShip = new Ship('foo', 3);

      expectShip.addShipStart(shipStartPoint);
      expectShip.addShipEndPoint(shipEndPoint);
      expectShip.isPlaced = true;

      PlayerPlaceShip.selectShip(Ship1);
      PlayerPlaceShip.shipPlacement(shipStartPoint);
      PlayerPlaceShip.shipPlacement(shipEndPoint);

      const shipStartPoint2 = 12;
      const shipEndPoint2 = 10;

      PlayerPlaceShip.selectShip(Ship2);
      PlayerPlaceShip.shipPlacement(shipStartPoint2);
      PlayerPlaceShip.shipPlacement(shipEndPoint2);

      expect(Player.gameboard[0].ship).toEqual(expectShip);
      expect(Player.gameboard[10].ship).toEqual(expectShip);
    });
  });

  describe('placeShipOnGameBoard', () => {
    it('can place a ship on the gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;
      const expectShip = new Ship('foo', 3);

      expectShip.isPlaced = true;

      PlayerPlaceShip.placeShipOnGameBoard(Ship1, shipStartPoint, shipEndPoint);

      expect(Player.gameboard[0].ship).toEqual(expectShip);
      expect(Player.gameboard[1].ship).toEqual(expectShip);
      expect(Player.gameboard[2].ship).toEqual(expectShip);
    });

    it('will not place a ship in un-available locations', () => {
      const expectShip = new Ship('foo', 3);

      Player.gameboard[4].ship = Ship1;
      Player.gameboard[5].ship = Ship1;
      Player.gameboard[6].ship = Ship1;

      const shipStartPoint = 4;
      const shipEndPoint = 7;

      PlayerPlaceShip.placeShipOnGameBoard(Ship2, shipStartPoint, shipEndPoint);

      expect(Player.gameboard[4].ship).toEqual(expectShip);
      expect(Player.gameboard[5].ship).toEqual(expectShip);
      expect(Player.gameboard[6].ship).toEqual(expectShip);
      expect(Player.gameboard[7].ship).toBe(null);
    });

    test('all ships can be placed on the gameboard', () => {
      Player.Battleship.isPlaced = true;
      Player.Carrier.isPlaced = true;
      Player.Cruiser.isPlaced = true;
      Player.Destroyer.isPlaced = true;

      const startSquare = 30;
      const endSquare = 31;

      Player.Submarine.addShipStart(startSquare);
      PlayerPlaceShip.selectShip(Player.Submarine);
      PlayerPlaceShip.shipPlacement(endSquare);

      expect(Player.allShipsPlaced).toBe(true);
    });
  });
});
