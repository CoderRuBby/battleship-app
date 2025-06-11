import { describe, it, expect, beforeEach, test } from 'vitest';
import GameBoard from '~/utils/gameboard-object';
import Ship from '~/utils/ship-object';

describe('GameBoard', () => {
  let testGameBoard: GameBoard;
  let Ship1: Ship;
  let Ship2: Ship;
  let Opponent: GameBoard;

  beforeEach(() => {
    testGameBoard = new GameBoard();
    Ship1 = new Ship('foo', 3);
    Ship2 = new Ship('bar', 4);
    Opponent = new GameBoard();
  });

  describe('possibleShipEndPoints', () => {
    it('can output 4 endpoints', () => {
      const shipLength = 3;
      const shipStartPoint = 45;

      expect(
        testGameBoard.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([47, 43, 65, 25]);
    });

    it('can correctly output 2 endpoints', () => {
      const shipLength = 2;
      const shipStartPoint = 0;

      expect(
        testGameBoard.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([1, 10]);
    });

    it('will not output used endPoints', () => {
      testGameBoard.gameboard[0].ship = Ship1;
      testGameBoard.gameboard[1].ship = Ship1;
      testGameBoard.gameboard[2].ship = Ship1;

      const shipLength = 4;
      const shipStartPoint = 4;

      expect(
        testGameBoard.possibleShipEndPoints(shipStartPoint, shipLength),
      ).toEqual([7, 34]);
    });
  });

  describe('possibleShipPath', () => {
    it('can output ship path', () => {
      const shipLength = 2;
      const shipStartPoint = 0;
      const shipEndPoint = 1;

      expect(
        testGameBoard.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
        ),
      ).toEqual([0, 1]);
    });

    it('will return an empty array if any square in path is used', () => {
      testGameBoard.gameboard[4].ship = Ship1;
      testGameBoard.gameboard[14].ship = Ship1;
      testGameBoard.gameboard[24].ship = Ship1;

      const shipLength = 3;
      const shipStartPoint = 4;
      const shipEndPoint = 24;

      expect(
        testGameBoard.possibleShipPath(
          shipLength,
          shipStartPoint,
          shipEndPoint,
        ),
      ).toEqual([]);
    });
  });

  describe('placeShipOnGameBoard', () => {
    it('can place a ship on the gameboard', () => {
      const shipStartPoint = 0;
      const shipEndPoint = 2;
      const expectShip = new Ship('foo', 3);
      expectShip.isPlaced = true;

      testGameBoard.placeShipOnGameBoard(Ship1, shipStartPoint, shipEndPoint);

      expect(testGameBoard.gameboard[0].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[1].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[2].ship).toEqual(expectShip);
    });

    it('will not place a ship in un-available locations', () => {
      const expectShip = new Ship('foo', 3);

      testGameBoard.gameboard[4].ship = Ship1;
      testGameBoard.gameboard[5].ship = Ship1;
      testGameBoard.gameboard[6].ship = Ship1;

      const shipStartPoint = 4;
      const shipEndPoint = 7;
      testGameBoard.placeShipOnGameBoard(Ship2, shipStartPoint, shipEndPoint);

      expect(testGameBoard.gameboard[4].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[5].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[6].ship).toEqual(expectShip);
      expect(testGameBoard.gameboard[7].ship).toBe(null);
    });

    test('all ships can be placed on the gameboard', () => {
      testGameBoard.Battleship.isPlaced = true;
      testGameBoard.Carrier.isPlaced = true;
      testGameBoard.Cruiser.isPlaced = true;
      testGameBoard.Destroyer.isPlaced = true;

      const startSquare = 30;
      const endSquare = 31;
      testGameBoard.Submarine.addShipStart(startSquare);
      testGameBoard.selectShip(testGameBoard.Submarine);
      testGameBoard.shipPlacement(endSquare);

      expect(testGameBoard.allShipsPlaced).toBe(true);
    });
  });

  describe('attack', () => {
    it('can hit a ship on the opponents gameboard', () => {
      const square = 45;
      Opponent.gameboard[square].ship = Ship1;
      const expectShip = new Ship('foo', 3);
      expectShip.isHit();

      testGameBoard.attack(square, Opponent);

      expect(Opponent.gameboard[square].isHit).toBe(true);
      expect(Opponent.gameboard[square].ship).toEqual(expectShip);
    });

    it('can attack a square with no ship on the opponents board', () => {
      const square = 62;
      const ExpectOpponent = new GameBoard();
      ExpectOpponent.gameboard[square].isMiss = true;

      testGameBoard.attack(square, Opponent);

      expect(Opponent.gameboard[square].isMiss).toBe(true);
    });
  });

  describe('turn', () => {
    it('will let player place ships if all ships have not been placed', () => {
      const Player = new GameBoard();
      let square = 56;
      let square2 = 59;
      const Battleship = Player.Battleship;
      Player.selectShip(Battleship);
      Player.turn(square);

      expect(Player.Battleship.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Battleship);

      Player.turn(square2);

      expect(Battleship.shipEndPoint).toBe(square2);
      expect(Battleship.isPlaced).toBe(true);
      expect(Player.gameboard[56].ship).toEqual(Battleship);
      expect(Player.gameboard[57].ship).toEqual(Battleship);
      expect(Player.gameboard[58].ship).toEqual(Battleship);
      expect(Player.gameboard[59].ship).toEqual(Battleship);
      expect(Player.selectedShip).toBe(null);

      square = 30;
      square2 = 34;
      const Carrier = Player.Carrier;

      Player.selectShip(Carrier);
      Player.turn(square);

      expect(Carrier.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Carrier);

      Player.turn(square2);

      expect(Carrier.shipEndPoint).toBe(square2);
      expect(Carrier.isPlaced).toBe(true);
      expect(Player.gameboard[30].ship).toEqual(Carrier);
      expect(Player.gameboard[31].ship).toEqual(Carrier);
      expect(Player.gameboard[32].ship).toEqual(Carrier);
      expect(Player.gameboard[33].ship).toEqual(Carrier);
      expect(Player.gameboard[34].ship).toEqual(Carrier);
      expect(Player.selectedShip).toBe(null);

      const Cruiser = Player.Cruiser;
      square = 15;
      square2 = 17;

      Player.selectShip(Cruiser);
      Player.turn(square);

      expect(Cruiser.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Cruiser);

      Player.turn(square2);

      expect(Cruiser.shipEndPoint).toBe(square2);
      expect(Cruiser.isPlaced).toBe(true);
      expect(Player.gameboard[15].ship).toEqual(Cruiser);
      expect(Player.gameboard[16].ship).toEqual(Cruiser);
      expect(Player.gameboard[17].ship).toEqual(Cruiser);
      expect(Player.selectedShip).toBe(null);

      const Submarine = Player.Submarine;
      square = 46;
      square2 = 48;

      Player.selectShip(Submarine);
      Player.turn(square);

      expect(Player.selectedShip).toEqual(Submarine);
      expect(Submarine.shipStartPoint).toBe(square);

      Player.turn(square2);

      expect(Submarine.shipEndPoint).toBe(square2);
      expect(Submarine.isPlaced).toBe(true);
      expect(Player.gameboard[46].ship).toEqual(Submarine);
      expect(Player.gameboard[47].ship).toEqual(Submarine);
      expect(Player.gameboard[48].ship).toEqual(Submarine);
      expect(Player.selectedShip).toBe(null);

      const Destroyer = Player.Destroyer;
      square = 70;
      square2 = 80;

      Player.selectShip(Destroyer);
      Player.turn(square);

      expect(Player.selectedShip).toEqual(Destroyer);
      expect(Destroyer.shipStartPoint).toBe(square);

      Player.turn(square2);

      expect(Destroyer.shipEndPoint).toBe(square2);
      expect(Destroyer.isPlaced).toBe(true);
      expect(Player.gameboard[70].ship).toEqual(Destroyer);
      expect(Player.gameboard[80].ship).toEqual(Destroyer);
      expect(Player.selectedShip).toBe(null);
      expect(Player.allShipsPlaced).toBe(true);
    });

    it('will do nothing if the same square is chosen', () => {
      const Player = new GameBoard();
      const square = 56;
      const square2 = 59;
      const Battleship = Player.Battleship;
      Player.selectShip(Battleship);
      Player.turn(square);

      expect(Player.Battleship.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Battleship);

      Player.turn(square2);

      expect(Battleship.shipEndPoint).toBe(square2);
      expect(Battleship.isPlaced).toBe(true);
      expect(Player.gameboard[56].ship).toEqual(Battleship);
      expect(Player.gameboard[57].ship).toEqual(Battleship);
      expect(Player.gameboard[58].ship).toEqual(Battleship);
      expect(Player.gameboard[59].ship).toEqual(Battleship);
      expect(Player.selectedShip).toBe(null);

      const Carrier = Player.Carrier;
      const square3 = 45;
      const square4 = 49;
      Player.selectShip(Carrier);

      //chooses square already chosen
      Player.turn(square);

      //does nothing
      expect(Player.gameboard[square].ship).toEqual(Battleship);
      expect(Carrier.shipStartPoint).toBe(null);
      expect(Player.selectedShip).toEqual(Carrier);

      //continue turn like normal
      Player.turn(square3);
      Player.turn(square4);

      expect(Carrier.shipStartPoint).toBe(square3);
      expect(Carrier.shipEndPoint).toBe(square4);
      expect(Carrier.isPlaced).toBe(true);
      expect(Player.gameboard[45].ship).toEqual(Carrier);
      expect(Player.gameboard[46].ship).toEqual(Carrier);
      expect(Player.gameboard[47].ship).toEqual(Carrier);
      expect(Player.gameboard[48].ship).toEqual(Carrier);
      expect(Player.gameboard[49].ship).toEqual(Carrier);
      expect(Player.selectedShip).toBe(null);
    });

    it('will attack opponent after all ships have been placed', () => {
      const square = 35;
      testGameBoard.allShipsPlaced = true;

      testGameBoard.turn(square, Opponent);

      expect(Opponent.gameboard[square].isMiss).toBe(true);
    });
  });
});
