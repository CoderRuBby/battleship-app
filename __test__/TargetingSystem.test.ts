import { describe, it, beforeEach, expect, vi } from 'vitest';
import TargetingSystem from '~/utils/TargetingSystem';
import GameBoard from '~/utils/GameBoard';

describe('AdjacentSquares', () => {
  let Player: GameBoard;
  let NewTargetingSystem: TargetingSystem;

  beforeEach(() => {
    Player = new GameBoard();
    NewTargetingSystem = new TargetingSystem();
  });

  describe('randomAttackLocation', () => {
    it('will return a possible square to be attacked', () => {
      const randomLocation = NewTargetingSystem.randomAttackLocation(
        Player,
        100,
      );

      expect(Number.isInteger(randomLocation)).toBe(true);
    });

    it('will not get a location that has a miss', () => {
      const testLocation = 45;

      Player.gameboard[testLocation].isMiss = true;

      const randomLocation = NewTargetingSystem.randomAttackLocation(
        Player,
        100,
        testLocation,
      );

      expect(randomLocation).not.toBe(testLocation);
    });

    it('will not get a location that has a hit', () => {
      const testLocation = 45;

      Player.gameboard[testLocation].isHit = true;

      const randomLocation = NewTargetingSystem.randomAttackLocation(
        Player,
        100,
        testLocation,
      );

      expect(randomLocation).not.toBe(testLocation);
    });
  });

  describe('TargetingSystem', () => {
    it('will return [22, 24, 33, 13] given location #23', () => {
      const attackedSquare = 23;
      const adjacentSquares = NewTargetingSystem.getSquares(
        attackedSquare,
        Player,
      );

      expect(adjacentSquares).toContain(24);
      expect(adjacentSquares).toContain(22);
      expect(adjacentSquares).toContain(13);
      expect(adjacentSquares).toContain(33);
      expect(adjacentSquares.size).toBe(4);
    });

    it('will return [1, 10], given location #0', () => {
      const attackedSquare = 0;

      const adjacentSquares = NewTargetingSystem.getSquares(
        attackedSquare,
        Player,
      );

      expect(adjacentSquares).toContain(1);
      expect(adjacentSquares).toContain(10);
      expect(adjacentSquares).not.toContain(-1);
      expect(adjacentSquares).not.toContain(-10);
      expect(adjacentSquares.size).toBe(2);
    });

    it('will not return squares that have hit/miss', () => {
      Player.gameboard[57].isHit = true;
      Player.gameboard[55].isMiss = true;

      const attackedSquare = 56;

      const adjacentSquares = NewTargetingSystem.getSquares(
        attackedSquare,
        Player,
      );

      expect(adjacentSquares).toContain(46);
      expect(adjacentSquares).toContain(66);
      expect(adjacentSquares).not.toContain(55);
      expect(adjacentSquares).not.toContain(57);
      expect(adjacentSquares.size).toBe(2);
    });

    it('will return squares that have an opponents ship, not hit', () => {
      const attackedSquare = 55;

      Player.gameboard[56].ship = Player.Battleship;

      const adjacentSquares = NewTargetingSystem.getSquares(
        attackedSquare,
        Player,
      );

      expect(adjacentSquares).toContain(54);
      expect(adjacentSquares).toContain(56);
      expect(adjacentSquares).toContain(65);
      expect(adjacentSquares).toContain(45);
      expect(adjacentSquares.size).toBe(4);
    });
  });

  describe('getAttackPath', () => {
    it('can generate a horizontal attackPath', () => {
      NewTargetingSystem.initialHitSquare = 36;
      NewTargetingSystem.possibleAttacks = new Set([35, 37, 26, 46]);
      NewTargetingSystem.attackOrientation = 'row';

      const attackPath = NewTargetingSystem.getAttackPath(37);

      expect(attackPath).toEqual(new Set([35, 37]));
    });

    it('can generate a vertical attackPath', () => {
      NewTargetingSystem.initialHitSquare = 36;
      NewTargetingSystem.possibleAttacks = new Set([35, 37, 26, 46]);
      NewTargetingSystem.attackOrientation = 'column';

      const attackPath = NewTargetingSystem.getAttackPath(26);

      expect(attackPath).toEqual(new Set([26, 46]));
    });
  });

  describe('getMorePossibleAttacks', () => {
    it('will get new possibilities for possibleAttacks', () => {
      Player.gameboard[44].isHit = true;
      Player.gameboard[47].isHit = true;

      Player.gameboard[45].ship = Player.Battleship;
      Player.Battleship.isHit(45);
      Player.gameboard[45].isHit = true;
      NewTargetingSystem.hitShips.add(Player.Battleship);

      Player.gameboard[46].ship = Player.Carrier;
      Player.Carrier.isHit(46);
      Player.gameboard[46].isHit = true;
      NewTargetingSystem.hitShips.add(Player.Carrier);

      const possibleAttacks = NewTargetingSystem.getMorePossibleAttacks(Player);

      expect(possibleAttacks.size).toBe(4);
      expect(possibleAttacks).toContain(35);
      expect(possibleAttacks).toContain(36);
      expect(possibleAttacks).toContain(55);
      expect(possibleAttacks).toContain(56);
    });
  });

  describe('attackLogic', () => {
    //!refactor block into beforeFirstHit
    describe('attackLogic when no opponent ships are hit', () => {
      it('will attack random locations that can result in a miss', () => {
        const attackSpy = vi.spyOn(NewTargetingSystem, 'randomAttackLocation');

        NewTargetingSystem.attackLogic(Player);

        expect(attackSpy).toHaveBeenCalled();
      });

      describe('when attack is a hit', () => {
        it('will generate/add squaresArray property', () => {
          const attackLocation = 45;
          const attackSpy = vi.spyOn(NewTargetingSystem, 'getSquares');

          Player.gameboard[attackLocation].isHit = true;

          NewTargetingSystem.attackLogic(Player, attackLocation);

          expect(attackSpy).toHaveBeenCalled();
        });

        it('will add hit ship to hitShips set', () => {
          const attackLocation = 45;

          Player.gameboard[attackLocation].ship = Player.Battleship;
          Player.gameboard[attackLocation].isHit = true;

          NewTargetingSystem.attackLogic(Player, attackLocation);

          expect(NewTargetingSystem.hitShips).toEqual(
            new Set().add(Player.Battleship),
          );
        });
      });
    });

    //!refactor block into afterFirstHit
    describe('attackLogic after first ship is hit', () => {
      it('will attack a random adjacent location', () => {
        const attackSpy = vi.spyOn(NewTargetingSystem, 'randomAttackLocation');

        NewTargetingSystem.possibleAttacks = new Set([4, 5, 6, 7]);
        NewTargetingSystem.hitShips.add(Player.Battleship);

        NewTargetingSystem.attackLogic(Player);

        expect(attackSpy).toHaveBeenCalled();
      });

      describe('when attack is a miss', () => {
        it('will remove the attacked location from adjSquares property', () => {
          const attackLocation = 45;

          Player.gameboard[attackLocation].ship = Player.Battleship;

          NewTargetingSystem.attackLogic(Player, attackLocation);
          const secondAttack = NewTargetingSystem.attackLogic(Player);

          expect(NewTargetingSystem.possibleAttacks).not.toContain(
            secondAttack,
          );
        });
      });
      describe('when attack is a hit', () => {
        describe('when attack results in a sunk ship', () => {
          it('will call resetProperties', () => {
            const attackSpy = vi.spyOn(NewTargetingSystem, 'resetProperties');
            const firstAttack = 45;
            const secondAttack = 55;
            const thirdAttack = 65;
            const fourthAttack = 35;

            Player.gameboard[firstAttack].ship = Player.Battleship;
            Player.gameboard[firstAttack].ship.isHit(firstAttack);
            Player.gameboard[secondAttack].ship = Player.Battleship;
            Player.gameboard[secondAttack].ship.isHit(secondAttack);
            Player.gameboard[thirdAttack].ship = Player.Battleship;
            Player.gameboard[thirdAttack].ship.isHit(thirdAttack);
            Player.gameboard[fourthAttack].ship = Player.Battleship;
            Player.gameboard[fourthAttack].ship.isHit(fourthAttack);

            NewTargetingSystem.attackLogic(Player, fourthAttack);

            expect(attackSpy).toHaveBeenCalled();
          });

          it('will reset TargetingSystem properties', () => {
            const firstAttack = 45;
            const secondAttack = 55;
            const thirdAttack = 65;
            const fourthAttack = 35;

            Player.gameboard[firstAttack].ship = Player.Battleship;
            Player.gameboard[secondAttack].ship = Player.Battleship;
            Player.gameboard[thirdAttack].ship = Player.Battleship;
            Player.gameboard[fourthAttack].ship = Player.Battleship;

            NewTargetingSystem.attackLogic(Player, firstAttack);
            NewTargetingSystem.attackLogic(Player, secondAttack);
            NewTargetingSystem.attackLogic(Player, thirdAttack);
            NewTargetingSystem.attackLogic(Player, fourthAttack);

            expect(NewTargetingSystem.possibleAttacks.size).toBe(0);
            //expect(Ai.TargetingSystem.attackPath.size).toBe(0);
            expect(NewTargetingSystem.initialHitSquare).toBe(null);
            expect(NewTargetingSystem.attackOrientation).toBe(null);
          });
        });

        describe('attackLogic when possibleAttacks has no possibilities', () => {
          it('will call getMorePossibleAttacks', () => {
            const attackSpy = vi.spyOn(
              NewTargetingSystem,
              'getMorePossibleAttacks',
            );
            const attackLocation = 45;

            Player.gameboard[attackLocation].ship = Player.Battleship;
            Player.gameboard[attackLocation].isHit = true;

            NewTargetingSystem.hitShips.add(Player.Battleship);
            NewTargetingSystem.possibleAttacks = new Set();

            NewTargetingSystem.attackLogic(Player, attackLocation);

            expect(attackSpy).toHaveBeenCalled();
          });
        });
      });
    });
    //!refactor block into afterFirstHit
  });
});
