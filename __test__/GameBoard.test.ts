import { describe, it, expect, beforeEach } from 'vitest';
import type { GameBoardType } from '~/utils/GameBoard';
import { GameBoard } from '~/utils/GameBoard';
import type { ShipType } from '~/utils/Ship';
import { Ship } from '~/utils/Ship';

describe('GameBoard', () => {
  let Battleship: ShipType;
  let Player: GameBoardType;
  let Opponent: GameBoardType;

  beforeEach(() => {
    Battleship = Ship('Battleship', 4);
    Player = GameBoard([Battleship]);
    Opponent = GameBoard([Battleship]);
  });

  describe.skip('selectShip', () => {
    it('can select a ship', () => {
      Player.selectShip(Player.Battleship);

      expect(Player.selectedShip).toEqual(Player.Battleship);
    });
  });

  describe.skip('shipPlacement', () => {
    it('can assign a shipStartPoint to a ship', () => {
      const startPoint = 45;
      Player.selectShip(Player.Battleship);
      Player.shipPlacement(startPoint);

      expect(Player.Battleship.shipStartPoint).toBe(startPoint);
    });

    it('can assign a shipEndPoint', () => {
      const startPoint = 45;
      const endPoint = 48;

      Player.selectShip(Player.Battleship);
      Player.shipPlacement(startPoint);
      Player.shipPlacement(endPoint);

      expect(Player.Battleship.shipEndPoint).toBe(endPoint);
    });

    it('place the ship on the game board', () => {
      const startPoint = 45;
      const endPoint = 48;

      Player.selectShip(Player.Battleship);
      Player.shipPlacement(startPoint);
      Player.shipPlacement(endPoint);

      expect(Player.gameboard[45].ship).toEqual(Player.Battleship);
      expect(Player.gameboard[46].ship).toEqual(Player.Battleship);
      expect(Player.gameboard[47].ship).toEqual(Player.Battleship);
      expect(Player.gameboard[48].ship).toEqual(Player.Battleship);
    });
  });

  describe.skip('attack', () => {
    it('can attack opponents game board as a miss', () => {
      const attackLocation = 34;

      Player.NewAttack.attack(attackLocation, Opponent);

      expect(Opponent.gameboard[attackLocation].isMiss).toBe(true);
    });

    it('can attack an opponents ship', () => {
      const attackLocation = 34;

      Opponent.gameboard[attackLocation].ship = Opponent.Battleship;

      Player.NewAttack.attack(attackLocation, Opponent);

      expect(Opponent.gameboard[attackLocation].isHit).toBe(true);
      expect(Opponent.Battleship.hit).toBe(1);
    });
  });

  describe.skip('turn', () => {
    it('will let player place ships if all ships have not been placed', () => {
      let square = 56;
      let square2 = 59;
      const Battleship = Player.Battleship;

      Player.selectShip(Battleship);
      Player.turn(square, Opponent);

      expect(Player.Battleship.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Battleship);

      Player.turn(square2, Opponent);

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
      Player.turn(square, Opponent);

      expect(Carrier.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Carrier);

      Player.turn(square2, Opponent);

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
      Player.turn(square, Opponent);

      expect(Cruiser.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Cruiser);

      Player.turn(square2, Opponent);

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
      Player.turn(square, Opponent);

      expect(Player.selectedShip).toEqual(Submarine);
      expect(Submarine.shipStartPoint).toBe(square);

      Player.turn(square2, Opponent);

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
      Player.turn(square, Opponent);

      expect(Player.selectedShip).toEqual(Destroyer);
      expect(Destroyer.shipStartPoint).toBe(square);

      Player.turn(square2, Opponent);

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
      Player.turn(square, Opponent);

      expect(Player.Battleship.shipStartPoint).toBe(square);
      expect(Player.selectedShip).toEqual(Battleship);

      Player.turn(square2, Opponent);

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
      Player.turn(square, Opponent);

      //does nothing
      expect(Player.gameboard[square].ship).toEqual(Battleship);
      expect(Carrier.shipStartPoint).toBe(null);
      expect(Player.selectedShip).toEqual(Carrier);

      //continue turn like normal
      Player.turn(square3, Opponent);
      Player.turn(square4, Opponent);

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
      Player.allShipsPlaced = true;

      Player.turn(square, Opponent);

      expect(Opponent.gameboard[square].isMiss).toBe(true);
    });

    it('will declare a winner if all ships are sunk', () => {
      Player.allShipsPlaced = true;
      Opponent.Battleship.sunk = true;
      Opponent.Carrier.sunk = true;
      Opponent.Cruiser.sunk = true;
      Opponent.Submarine.sunk = true;
      Opponent.gameboard[45].ship = Opponent.Destroyer;
      Opponent.gameboard[46].ship = Opponent.Destroyer;

      Player.turn(45, Opponent);
      Player.turn(46, Opponent);

      expect(Player.winner).toBe(true);
    });
  });
});
