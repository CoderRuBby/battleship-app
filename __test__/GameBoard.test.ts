import { describe, it, expect, beforeEach } from 'vitest';
import GameBoard from '~/utils/GameBoard';
import Ship from '~/utils/Ship';

describe('GameBoard', () => {
  let testGameBoard: GameBoard;
  let Ship1: Ship;
  let Opponent: GameBoard;

  beforeEach(() => {
    testGameBoard = new GameBoard();
    Ship1 = new Ship('foo', 3);
    Opponent = new GameBoard();
  });

  describe('selectShip', () => {
    it('can select a ship', () => {
      testGameBoard.selectShip(testGameBoard.Battleship);

      expect(testGameBoard.selectedShip).toEqual(testGameBoard.Battleship);
    });
  });

  describe('shipPlacement', () => {
    it('can assign a shipStartPoint to a ship', () => {
      const startPoint = 45;
      testGameBoard.selectShip(testGameBoard.Battleship);
      testGameBoard.shipPlacement(startPoint);

      expect(testGameBoard.Battleship.shipStartPoint).toBe(startPoint);
    });

    it('can assign a shipEndPoint', () => {
      const startPoint = 45;
      const endPoint = 48;

      testGameBoard.selectShip(testGameBoard.Battleship);
      testGameBoard.shipPlacement(startPoint);
      testGameBoard.shipPlacement(endPoint);

      expect(testGameBoard.Battleship.shipEndPoint).toBe(endPoint);
    });

    it('place the ship on the game board', () => {
      const startPoint = 45;
      const endPoint = 48;

      testGameBoard.selectShip(testGameBoard.Battleship);
      testGameBoard.shipPlacement(startPoint);
      testGameBoard.shipPlacement(endPoint);

      expect(testGameBoard.gameboard[45].ship).toEqual(
        testGameBoard.Battleship,
      );
      expect(testGameBoard.gameboard[46].ship).toEqual(
        testGameBoard.Battleship,
      );
      expect(testGameBoard.gameboard[47].ship).toEqual(
        testGameBoard.Battleship,
      );
      expect(testGameBoard.gameboard[48].ship).toEqual(
        testGameBoard.Battleship,
      );
    });
  });

  describe('attack', () => {
    it('can attack opponents game board as a miss', () => {
      const attackLocation = 34;

      testGameBoard.NewAttack.attack(attackLocation, Opponent);

      expect(Opponent.gameboard[attackLocation].isMiss).toBe(true);
    });

    it('can attack an opponents ship', () => {
      const attackLocation = 34;

      Opponent.gameboard[attackLocation].ship = Opponent.Battleship;

      testGameBoard.NewAttack.attack(attackLocation, Opponent);

      expect(Opponent.gameboard[attackLocation].isHit).toBe(true);
      expect(Opponent.Battleship.hit).toBe(1);
    });
  });

  describe('turn', () => {
    it('will let player place ships if all ships have not been placed', () => {
      //const Player = new GameBoard();
      let square = 56;
      let square2 = 59;
      const Battleship = testGameBoard.Battleship;

      testGameBoard.selectShip(Battleship);
      testGameBoard.turn(square);

      expect(testGameBoard.Battleship.shipStartPoint).toBe(square);
      expect(testGameBoard.selectedShip).toEqual(Battleship);

      testGameBoard.turn(square2);

      expect(Battleship.shipEndPoint).toBe(square2);
      expect(Battleship.isPlaced).toBe(true);
      expect(testGameBoard.gameboard[56].ship).toEqual(Battleship);
      expect(testGameBoard.gameboard[57].ship).toEqual(Battleship);
      expect(testGameBoard.gameboard[58].ship).toEqual(Battleship);
      expect(testGameBoard.gameboard[59].ship).toEqual(Battleship);
      expect(testGameBoard.selectedShip).toBe(null);

      square = 30;
      square2 = 34;
      const Carrier = testGameBoard.Carrier;

      testGameBoard.selectShip(Carrier);
      testGameBoard.turn(square);

      expect(Carrier.shipStartPoint).toBe(square);
      expect(testGameBoard.selectedShip).toEqual(Carrier);

      testGameBoard.turn(square2);

      expect(Carrier.shipEndPoint).toBe(square2);
      expect(Carrier.isPlaced).toBe(true);
      expect(testGameBoard.gameboard[30].ship).toEqual(Carrier);
      expect(testGameBoard.gameboard[31].ship).toEqual(Carrier);
      expect(testGameBoard.gameboard[32].ship).toEqual(Carrier);
      expect(testGameBoard.gameboard[33].ship).toEqual(Carrier);
      expect(testGameBoard.gameboard[34].ship).toEqual(Carrier);
      expect(testGameBoard.selectedShip).toBe(null);

      const Cruiser = testGameBoard.Cruiser;
      square = 15;
      square2 = 17;

      testGameBoard.selectShip(Cruiser);
      testGameBoard.turn(square);

      expect(Cruiser.shipStartPoint).toBe(square);
      expect(testGameBoard.selectedShip).toEqual(Cruiser);

      testGameBoard.turn(square2);

      expect(Cruiser.shipEndPoint).toBe(square2);
      expect(Cruiser.isPlaced).toBe(true);
      expect(testGameBoard.gameboard[15].ship).toEqual(Cruiser);
      expect(testGameBoard.gameboard[16].ship).toEqual(Cruiser);
      expect(testGameBoard.gameboard[17].ship).toEqual(Cruiser);
      expect(testGameBoard.selectedShip).toBe(null);

      const Submarine = testGameBoard.Submarine;
      square = 46;
      square2 = 48;

      testGameBoard.selectShip(Submarine);
      testGameBoard.turn(square);

      expect(testGameBoard.selectedShip).toEqual(Submarine);
      expect(Submarine.shipStartPoint).toBe(square);

      testGameBoard.turn(square2);

      expect(Submarine.shipEndPoint).toBe(square2);
      expect(Submarine.isPlaced).toBe(true);
      expect(testGameBoard.gameboard[46].ship).toEqual(Submarine);
      expect(testGameBoard.gameboard[47].ship).toEqual(Submarine);
      expect(testGameBoard.gameboard[48].ship).toEqual(Submarine);
      expect(testGameBoard.selectedShip).toBe(null);

      const Destroyer = testGameBoard.Destroyer;
      square = 70;
      square2 = 80;

      testGameBoard.selectShip(Destroyer);
      testGameBoard.turn(square);

      expect(testGameBoard.selectedShip).toEqual(Destroyer);
      expect(Destroyer.shipStartPoint).toBe(square);

      testGameBoard.turn(square2);

      expect(Destroyer.shipEndPoint).toBe(square2);
      expect(Destroyer.isPlaced).toBe(true);
      expect(testGameBoard.gameboard[70].ship).toEqual(Destroyer);
      expect(testGameBoard.gameboard[80].ship).toEqual(Destroyer);
      expect(testGameBoard.selectedShip).toBe(null);
      expect(testGameBoard.allShipsPlaced).toBe(true);
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

    it.skip('will declare a winner if all ships are sunk', () => {
      Opponent.Battleship.sunk = true;
      Opponent.Carrier.sunk = true;
      Opponent.Cruiser.sunk = true;
      Opponent.Submarine.sunk = true;
      Opponent.gameboard[45].ship = Opponent.Destroyer;
      Opponent.gameboard[46].ship = Opponent.Destroyer;

      testGameBoard.attack(45, Opponent);
      testGameBoard.attack(45, Opponent);

      expect(testGameBoard.winner).toBe(true);
    });
  });
});
