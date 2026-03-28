import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest';
import type { targetingSystemInterface } from '~/utils/targetingSystem';
import targetingSystem from '~/utils/targetingSystem';
import { createPlayer1 } from './testData';

describe('AdjacentSquares', () => {
  let player1: ReturnType<typeof createPlayer1>;
  let NewTargetingSystem: targetingSystemInterface;

  beforeEach(() => {
    player1 = createPlayer1();
    NewTargetingSystem = targetingSystem();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('randomAttackLocation', () => {
    it('will return a possible square to be attacked', () => {
      const randomLocation = NewTargetingSystem.randomAttackLocation(
        player1,
        100,
      );

      expect(Number.isInteger(randomLocation)).toBe(true);
    });

    it('will not get a location that has a miss', () => {
      const testLocation = 45;

      player1.board[testLocation].isMiss = true;

      const randomLocation = NewTargetingSystem.randomAttackLocation(
        player1,
        100,
        testLocation,
      );

      expect(randomLocation).not.toBe(testLocation);
    });

    it('will not get a location that has a hit', () => {
      const testLocation = 45;

      player1.board[testLocation].isHit = true;

      const randomLocation = NewTargetingSystem.randomAttackLocation(
        player1,
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
        player1,
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
        player1,
      );

      expect(adjacentSquares).toContain(1);
      expect(adjacentSquares).toContain(10);
      expect(adjacentSquares).not.toContain(-1);
      expect(adjacentSquares).not.toContain(-10);
      expect(adjacentSquares.size).toBe(2);
    });

    it('will not return squares that have hit/miss', () => {
      player1.board[57].isHit = true;
      player1.board[55].isMiss = true;

      const attackedSquare = 56;

      const adjacentSquares = NewTargetingSystem.getSquares(
        attackedSquare,
        player1,
      );

      expect(adjacentSquares).toContain(46);
      expect(adjacentSquares).toContain(66);
      expect(adjacentSquares).not.toContain(55);
      expect(adjacentSquares).not.toContain(57);
      expect(adjacentSquares.size).toBe(2);
    });

    it('will return squares that have an opponents ship, not hit', () => {
      const attackedSquare = 55;

      player1.board[56].ship = player1.props.allShips[3];

      const adjacentSquares = NewTargetingSystem.getSquares(
        attackedSquare,
        player1,
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
      NewTargetingSystem.props.initialHitSquare = 36;
      NewTargetingSystem.props.possibleAttacks = new Set([35, 37, 26, 46]);
      NewTargetingSystem.props.attackOrientation = 'row';

      const attackPath = NewTargetingSystem.getAttackPath(37);

      expect(attackPath).toEqual(new Set([35, 37]));
    });

    it('can generate a vertical attackPath', () => {
      NewTargetingSystem.props.initialHitSquare = 36;
      NewTargetingSystem.props.possibleAttacks = new Set([35, 37, 26, 46]);
      NewTargetingSystem.props.attackOrientation = 'column';

      const attackPath = NewTargetingSystem.getAttackPath(26);

      expect(attackPath).toEqual(new Set([26, 46]));
    });
  });

  describe('getMorePossibleAttacks', () => {
    it('will get new possibilities for possibleAttacks', () => {
      player1.board[44].isHit = true;
      player1.board[47].isHit = true;

      player1.board[45].ship = player1.props.allShips[3];
      player1.props.allShips[3].isHit(45);
      player1.board[45].isHit = true;
      NewTargetingSystem.props.hitShips.add(player1.props.allShips[3]);

      player1.board[46].ship = player1.props.allShips[0];
      player1.props.allShips[0].isHit(46);
      player1.board[46].isHit = true;
      NewTargetingSystem.props.hitShips.add(player1.props.allShips[0]);

      const possibleAttacks =
        NewTargetingSystem.getMorePossibleAttacks(player1);

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

        NewTargetingSystem.attackLogic(player1);

        expect(attackSpy).toHaveBeenCalled();
      });

      describe('when attack is a hit', () => {
        it('will generate/add squaresArray property', () => {
          const attackLocation = 45;
          const attackSpy = vi.spyOn(NewTargetingSystem, 'getSquares');

          player1.board[attackLocation].isHit = true;

          NewTargetingSystem.attackLogic(player1, attackLocation);

          expect(attackSpy).toHaveBeenCalled();
        });

        it('will add hit ship to hitShips set', () => {
          const attackLocation = 45;

          player1.board[attackLocation].ship = player1.props.allShips[3];
          player1.board[attackLocation].isHit = true;

          NewTargetingSystem.attackLogic(player1, attackLocation);

          expect(NewTargetingSystem.props.hitShips).toEqual(
            new Set().add(player1.props.allShips[3]),
          );
        });
      });
    });

    //!refactor block into afterFirstHit
    describe('attackLogic after first ship is hit', () => {
      it('will attack a random adjacent location', () => {
        const attackSpy = vi.spyOn(NewTargetingSystem, 'randomAttackLocation');

        NewTargetingSystem.props.possibleAttacks = new Set([4, 5, 6, 7]);
        NewTargetingSystem.props.hitShips.add(player1.props.allShips[3]);

        NewTargetingSystem.attackLogic(player1);

        expect(attackSpy).toHaveBeenCalled();
      });

      describe('when attack is a miss', () => {
        it('will remove the attacked location from adjSquares property', () => {
          const attackLocation = 45;

          player1.board[attackLocation].ship = player1.props.allShips[3];

          NewTargetingSystem.attackLogic(player1, attackLocation);
          const secondAttack = NewTargetingSystem.attackLogic(player1);

          expect(NewTargetingSystem.props.possibleAttacks).not.toContain(
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

            player1.board[firstAttack].ship = player1.props.allShips[3];
            player1.board[firstAttack].ship.isHit(firstAttack);
            player1.board[secondAttack].ship = player1.props.allShips[3];
            player1.board[secondAttack].ship.isHit(secondAttack);
            player1.board[thirdAttack].ship = player1.props.allShips[3];
            player1.board[thirdAttack].ship.isHit(thirdAttack);
            player1.board[fourthAttack].ship = player1.props.allShips[3];
            player1.board[fourthAttack].ship.isHit(fourthAttack);

            NewTargetingSystem.attackLogic(player1, fourthAttack);

            expect(attackSpy).toHaveBeenCalled();
          });

          it('will reset TargetingSystem properties', () => {
            const firstAttack = 45;
            const secondAttack = 55;
            const thirdAttack = 65;
            const fourthAttack = 35;

            player1.board[firstAttack].ship = player1.props.allShips[3];
            player1.board[secondAttack].ship = player1.props.allShips[3];
            player1.board[thirdAttack].ship = player1.props.allShips[3];
            player1.board[fourthAttack].ship = player1.props.allShips[3];

            NewTargetingSystem.attackLogic(player1, firstAttack);
            NewTargetingSystem.attackLogic(player1, secondAttack);
            NewTargetingSystem.attackLogic(player1, thirdAttack);
            NewTargetingSystem.attackLogic(player1, fourthAttack);

            expect(NewTargetingSystem.props.possibleAttacks.size).toBe(0);
            expect(NewTargetingSystem.props.initialHitSquare).toBe(0);
            expect(NewTargetingSystem.props.attackOrientation).toBe('none');
          });
        });

        describe('attackLogic when possibleAttacks has no possibilities', () => {
          it('will call getMorePossibleAttacks', () => {
            const attackSpy = vi.spyOn(
              NewTargetingSystem,
              'getMorePossibleAttacks',
            );
            const attackLocation = 45;

            player1.board[attackLocation].ship = player1.props.allShips[3];
            player1.board[attackLocation].isHit = true;

            NewTargetingSystem.props.hitShips.add(player1.props.allShips[3]);
            NewTargetingSystem.props.possibleAttacks = new Set();

            NewTargetingSystem.attackLogic(player1, attackLocation);

            expect(attackSpy).toHaveBeenCalled();
          });
        });
      });
    });
    //!refactor block into afterFirstHit
  });
});
