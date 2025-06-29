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
  });

  describe('turn', () => {
    it.skip('will let player place ships if all ships have not been placed', () => {
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

    it('will declare a winner if all ships are sunk', () => {
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
