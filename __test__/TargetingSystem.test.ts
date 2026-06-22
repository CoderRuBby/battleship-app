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

    it('will return squares that have an opponents ship, not hit', () => {
      const attackedSquare = 55;

      player1.board[attackedSquare].ship = player1.props.allShips[3];

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
    it.skip('will return a location from possibleAttacks', () => {});
    it.skip('will generate more possible attacks', () => {});
  });
});
