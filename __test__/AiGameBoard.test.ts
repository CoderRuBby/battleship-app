import { describe, it, expect, beforeEach } from 'vitest';
import AiGameBoard from '~/utils/AiGameBoard';
import GameBoard from '~/utils/GameBoard';

describe('AiGameboard', () => {
  let Ai: AiGameBoard;
  let Player: GameBoard;

  beforeEach(() => {
    Ai = new AiGameBoard();
    Player = new GameBoard();
  });

  describe('placeShips', () => {
    it('can place all ships on game board', () => {
      Ai.placeAll();

      expect(Ai.allShipsPlaced).toBe(true);
    });
  });

  describe('getAdjacentSquares', () => {
    it('will return [22, 24, 33, 13], adjacent square to 23', () => {
      const attackedSquare = 23;
      const adjacentSquares = [22, 24, 33, 13];

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
    });

    it('will return [1, 10], adjacent square to 0', () => {
      const attackedSquare = 0;
      const adjacentSquares = [1, 10];

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
      expect(Ai.getAdjacentSquares(attackedSquare, Player)).not.toContain(-1);
      expect(Ai.getAdjacentSquares(attackedSquare, Player)).not.toContain(-10);
    });

    it('will not return squares that have been hit', () => {
      Player.gameboard[57].isHit = true;

      const attackedSquare = 56;
      const adjacentSquares = [55, 66, 46];

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
      expect(Ai.getAdjacentSquares(attackedSquare, Player)).not.toContain(57);
    });

    it('will return squares that have an opponents ship, not hit', () => {
      const attackedSquare = 55;
      const adjacentSquares = [54, 56, 65, 45];

      Player.gameboard[56].ship = Player.Battleship;

      adjacentSquares.forEach((location) => {
        expect(Ai.getAdjacentSquares(attackedSquare, Player)).toContain(
          location,
        );
      });
    });

    it('will update adjacentSquares property if ship is hit', () => {
      const attackedSquare = 35;

      Player.gameboard[attackedSquare].ship = Player.Battleship;

      Ai.getAdjacentSquares(attackedSquare, Player);

      expect(Ai.adjacentSquares).toContain(34);
      expect(Ai.adjacentSquares).toContain(36);
      expect(Ai.adjacentSquares).toContain(25);
      expect(Ai.adjacentSquares).toContain(45);
      expect(Ai.adjacentSquares.length).toBe(4);
    });
  });

  describe('getAttackOrientation', () => {
    it('will remove horizontal squares if attacking vertically', () => {
      const attackedSquare = 35;
      const adjacentAttack = 45;

      Ai.initialSquareHit = attackedSquare;
      Ai.adjacentSquares = [45, 36, 34, 25];
      Ai.getAttackOrientation(adjacentAttack);

      expect(Ai.adjacentSquares).not.toContain(attackedSquare);
      expect(Ai.adjacentSquares).not.toContain(34);
      expect(Ai.adjacentSquares).not.toContain(36);
      expect(Ai.adjacentSquares.length).toBe(2);
      expect(Ai.adjacentSquares).toContain(25);
      expect(Ai.adjacentSquares).toContain(45);
    });

    it('will remove vertical squares if attacking horizontally', () => {
      const attackedSquare = 35;
      const adjacentAttack = 36;

      Ai.initialSquareHit = attackedSquare;
      Ai.adjacentSquares = [45, 36, 34, 25];
      Ai.getAttackOrientation(adjacentAttack);

      expect(Ai.adjacentSquares).not.toContain(attackedSquare);
      expect(Ai.adjacentSquares).not.toContain(25);
      expect(Ai.adjacentSquares).not.toContain(45);
      expect(Ai.adjacentSquares.length).toBe(2);
      expect(Ai.adjacentSquares).toContain(34);
      expect(Ai.adjacentSquares).toContain(36);
    });
  });

  describe('addRowColSquare', () => {
    it('will add the appropriate adjacent square to adjacentSquares', () => {
      const attackedSquare = 35;
      const adjacentAttack = 36;

      Ai.initialSquareHit = attackedSquare;
      Ai.addRowColSquare(adjacentAttack);

      expect(Ai.adjacentSquares).toContain(37);
      expect(Ai.adjacentSquares.length).toBe(1);
    });
  });

  describe('attack()', () => {
    it('will update adjacentSquares when hitting a ship', () => {
      const attackedSquare = 35;

      Player.gameboard[attackedSquare].ship = Player.Battleship;

      Ai.attack(attackedSquare, Player);

      expect(Ai.adjacentSquares).toContain(34);
      expect(Ai.adjacentSquares).toContain(36);
      expect(Ai.adjacentSquares).toContain(25);
      expect(Ai.adjacentSquares).toContain(45);
      expect(Ai.adjacentSquares.length).toBe(4);
    });

    it('will remove a missed adjacent square from adjacentSquare prop', () => {
      const attackedSquare = 64;
      const adjacentAttack = 65;

      Player.gameboard[attackedSquare].ship = Player.Battleship;

      Ai.attack(attackedSquare, Player);
      Ai.attack(adjacentAttack, Player);

      expect(Ai.adjacentSquares).not.toContain(65);
    });

    it('will remove horizontal squares if attacking vertically', () => {
      const attackedSquare = 35;
      const adjacentAttack = 45;

      Player.gameboard[attackedSquare].ship = Player.Battleship;
      Player.gameboard[adjacentAttack].ship = Player.Battleship;

      Ai.attack(attackedSquare, Player);
      Ai.attack(adjacentAttack, Player);

      expect(Ai.adjacentSquares).not.toContain(attackedSquare);
      expect(Ai.adjacentSquares).not.toContain(adjacentAttack);
      expect(Ai.adjacentSquares).not.toContain(34);
      expect(Ai.adjacentSquares).not.toContain(36);
      expect(Ai.adjacentSquares.length).toBe(2);
      expect(Ai.adjacentSquares).toContain(25);
      expect(Ai.adjacentSquares).toContain(55);
    });

    it('will remove vertical squares if attacking horizontally', () => {
      const attackedSquare = 35;
      const adjacentAttack = 36;

      Player.gameboard[attackedSquare].ship = Player.Battleship;
      Player.gameboard[adjacentAttack].ship = Player.Battleship;

      Ai.attack(attackedSquare, Player);
      Ai.attack(adjacentAttack, Player);

      expect(Ai.adjacentSquares).not.toContain(attackedSquare);
      expect(Ai.adjacentSquares).not.toContain(adjacentAttack);
      expect(Ai.adjacentSquares).not.toContain(25);
      expect(Ai.adjacentSquares).not.toContain(45);
      expect(Ai.adjacentSquares.length).toBe(2);
      expect(Ai.adjacentSquares).toContain(34);
      expect(Ai.adjacentSquares).toContain(37);
    });

    it('will add the appropriate adjacent square to adjacentSquares', () => {
      const attackedSquare = 35;
      const adjacentAttack = 36;

      Player.gameboard[attackedSquare].ship = Player.Battleship;
      Player.gameboard[adjacentAttack].ship = Player.Battleship;

      Ai.attack(attackedSquare, Player);
      Ai.attack(adjacentAttack, Player);

      expect(Ai.adjacentSquares).toContain(34);
      expect(Ai.adjacentSquares).toContain(37);
      expect(Ai.adjacentSquares.length).toBe(2);
    });
  });

  describe('getAdjacentAttack()', () => {
    it('will return a random adjacent square from adjacentSquares', () => {
      Ai.adjacentSquares = [34, 36, 25, 45];

      expect(Ai.adjacentSquares).toContain(Ai.getAdjacentAttack());
    });
  });

  describe('turn', () => {
    it('will place ships on gameboard for the first turn', () => {
      Ai.turn();

      expect(Ai.allShipsPlaced).toBe(true);
    });

    it('will attack opponents gameboard after ships have been placed', () => {
      const square = 45;
      const square2 = 74;
      Player.gameboard[square2].ship = Player.Battleship;

      Ai.turn();
      Ai.turn(square, Player);
      Ai.turn(square2, Player);

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Player.gameboard[square].isMiss).toBe(true);
      expect(Player.gameboard[square2].isHit).toBe(true);
    });

    it('will attack adjacent squares after a ship has been hit', () => {
      const attackedSquare = 35;
      const adjacentSquares = [34, 36, 25, 45];

      Player.gameboard[attackedSquare].ship = Player.Battleship;

      Ai.turn();
      Ai.turn(attackedSquare, Player);
      Ai.turn(null, Player);

      const isAttacked = adjacentSquares.some(
        (square) =>
          Player.gameboard[square].isHit || Player.gameboard[square].isMiss,
      );

      expect(isAttacked).toBe(true);
    });
  });
});
