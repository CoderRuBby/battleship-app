import { describe, it, expect, beforeEach, vi } from 'vitest';
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

  describe('randomAttackLocation', () => {
    it('will return a possible square to be attacked', () => {
      const randomLocation = Ai.randomAttackLocation(Player, 100);

      expect(Number.isInteger(randomLocation)).toBe(true);
    });

    it('will not get a location that has a miss', () => {
      const testLocation = 45;

      Player.gameboard[testLocation].isMiss = true;

      const randomLocation = Ai.randomAttackLocation(Player, 100, testLocation);

      expect(randomLocation).not.toBe(testLocation);
    });

    it('will not get a location that has a hit', () => {
      const testLocation = 45;

      Player.gameboard[testLocation].isHit = true;

      const randomLocation = Ai.randomAttackLocation(Player, 100, testLocation);

      expect(randomLocation).not.toBe(testLocation);
    });
  });

  describe('attack', () => {
    // Since AiGameBoard extends GameBoard, it inherits the attack method
    // Test that it properly calls the attack functionality
    it('attacks Player location which can result in a miss', () => {
      const attackLocation = 45;

      Ai.attack(attackLocation, Player);

      expect(Player.gameboard[attackLocation].isMiss).toBe(true);
      expect(Player.gameboard[attackLocation].isHit).toBe(false);
    });

    it('attacks Player location which can result in a hit', () => {
      const attackLocation = 45;

      Player.gameboard[attackLocation].ship = Player.Battleship;

      Ai.attack(attackLocation, Player);

      expect(Player.gameboard[attackLocation].isHit).toBe(true);
      expect(Player.gameboard[attackLocation].isMiss).toBe(false);
    });
  });

  describe('attackLogic', () => {
    //!refactor block into beforeFirstHit
    describe('attackLogic when no opponent ships are hit', () => {
      it('will attack random locations that can result in a miss', () => {
        const attackLocation = 45;
        const attackSpy = vi.spyOn(Ai, 'attack');

        Ai.attackLogic(Player, attackLocation);

        expect(Ai.attack).toHaveBeenCalled();
        expect(attackSpy).toHaveBeenCalledWith(attackLocation, Player);
        expect(Player.gameboard[attackLocation].isMiss).toBe(true);
        expect(Player.gameboard[attackLocation].isHit).toBe(false);
      });

      it('will attack random locations that can result in a hit', () => {
        const attackLocation = 45;
        const attackSpy = vi.spyOn(Ai, 'attack');

        Player.gameboard[attackLocation].ship = Player.Battleship;

        Ai.attackLogic(Player, attackLocation);

        expect(Ai.attack).toHaveBeenCalled();
        expect(attackSpy).toHaveBeenCalledWith(attackLocation, Player);
        expect(Player.gameboard[attackLocation].isHit).toBe(true);
        expect(Player.gameboard[attackLocation].isMiss).toBe(false);
      });

      describe('when attack is a hit', () => {
        it('will generate/add squaresArray property', () => {
          const attackLocation = 45;

          Player.gameboard[attackLocation].ship = Player.Battleship;

          Ai.attackLogic(Player, attackLocation);

          expect(Player.gameboard[attackLocation].isHit).toBe(true);
          expect(Ai.TargetingSystem.squaresArray).toContain(46);
          expect(Ai.TargetingSystem.squaresArray).toContain(44);
          expect(Ai.TargetingSystem.squaresArray).toContain(55);
          expect(Ai.TargetingSystem.squaresArray).toContain(35);
          expect(Ai.TargetingSystem.squaresArray.length).toBe(4);
        });
        it('will add hit ship to hitShips set', () => {
          const attackLocation = 45;

          Player.gameboard[attackLocation].ship = Player.Battleship;

          Ai.attackLogic(Player, attackLocation);

          expect(Ai.hitShips).toEqual(new Set().add(Player.Battleship));
        });
      });
    });

    //!refactor block into afterFirstHit
    describe('attackLogic after first ship is hit', () => {
      it('will attack a random adjacent location', () => {
        const attackLocation = 45;

        Player.gameboard[attackLocation].ship = Player.Battleship;

        Ai.attackLogic(Player, attackLocation);
        Ai.attackLogic(Player);

        const isAttacked =
          Player.gameboard[46].isMiss === true ||
          Player.gameboard[44].isMiss === true ||
          Player.gameboard[55].isMiss === true ||
          Player.gameboard[35].isMiss === true;

        expect(isAttacked).toBe(true);
      });

      describe('when attack is a miss', () => {
        it('will remove the attacked location from adjSquares property', () => {
          const attackLocation = 45;

          Player.gameboard[attackLocation].ship = Player.Battleship;

          Ai.attackLogic(Player, attackLocation);
          const secondAttack = Ai.attackLogic(Player);

          expect(Ai.TargetingSystem.squaresArray).not.toContain(secondAttack);
        });
      });
      describe('when attack is a hit', () => {
        it('can generate a horizontal attackPath', () => {
          const attackLocation = 45;
          const secondAttackLocation = 46;

          Player.gameboard[attackLocation].ship = Player.Battleship;
          Player.gameboard[secondAttackLocation].ship = Player.Battleship;

          Ai.attackLogic(Player, attackLocation);
          Ai.attackLogic(Player, secondAttackLocation);

          expect(Ai.TargetingSystem.attackPath).toContain(44);
          expect(Ai.TargetingSystem.attackPath).toContain(47);
          expect(Ai.TargetingSystem.attackPath.size).toBe(2);
        });

        it('can generate a vertical attackPath', () => {
          const attackLocation = 45;
          const secondAttackLocation = 55;

          Player.gameboard[attackLocation].ship = Player.Battleship;
          Player.gameboard[secondAttackLocation].ship = Player.Battleship;

          Ai.attackLogic(Player, attackLocation);
          Ai.attackLogic(Player, secondAttackLocation);

          expect(Ai.TargetingSystem.attackPath).toContain(35);
          expect(Ai.TargetingSystem.attackPath).toContain(65);
          expect(Ai.TargetingSystem.attackPath.size).toBe(2);
        });

        describe('when attack results in a sunk ship', () => {
          it('will remove ship from hitShips property', () => {});
        });
      });
    });
    //!refactor block into afterFirstHit
  });

  describe.skip('turn', () => {
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
