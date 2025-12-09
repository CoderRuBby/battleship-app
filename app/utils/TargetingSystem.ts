import type { gameBoardInterface } from './GameBoard';
import type { shipInterface } from './Ship';

export interface targetingSystemInterface {
  possibleAttacks: Set<number>;
  initialHitSquare: number;
  attackOrientation: string;
  hitShips: Set<shipInterface>;
  isOpponentSquareAvailable: (
    square: number,
    opponent: gameBoardInterface,
  ) => boolean;
  isAvailableSquare: (square: number, opponent: gameBoardInterface) => boolean;
  possibleShipEndPoints: (
    initialSquare: number,
    shipLength: number,
    opponent: gameBoardInterface,
  ) => number[];
  getSquares: (square: number, opponent: gameBoardInterface) => Set<number>;
  removeAdjacentSquare: (square: number) => void;
  setAttackOrientation: (square: number) => void;
  isRowAttack: (square: number, adjacentSquare: number) => boolean;
  isColAttack: (square: number, adjacentSquare: number) => boolean;
  getAttackPath: (square: number) => Set<number>;
  resetProperties: () => void;
  randomAttackLocation: (
    player: gameBoardInterface,
    max: number,
    testNumber?: number,
  ) => number;
  getMorePossibleAttacks: (opponent: gameBoardInterface) => Set<number>;
  attackLogic: (opponent: gameBoardInterface, testNumber?: number) => number;
}

export default function targetingSystem() {
  return {
    possibleAttacks: new Set<number>(),
    initialHitSquare: 0,
    attackOrientation: 'none',
    hitShips: new Set<shipInterface>(),
    isOpponentSquareAvailable: function (
      square: number,
      opponent: gameBoardInterface,
    ): boolean {
      if (opponent.board[square].isHit) {
        return false;
      } else {
        return true;
      }
    },
    isAvailableSquare: function (
      square: number,
      opponent: gameBoardInterface,
    ): boolean {
      return !opponent.board[square].isHit && !opponent.board[square].isMiss;
    },
    possibleShipEndPoints: function (
      initialSquare: number,
      shipLength: number,
      opponent: gameBoardInterface,
    ): number[] {
      const possibleEndPoints: number[] = [];
      const row = Math.floor(initialSquare / 10);
      const col = initialSquare % 10;
      let endPoint: number;

      // Check right direction
      if (col + shipLength - 1 < 10) {
        endPoint = initialSquare + (shipLength - 1);
        if (this.isAvailableSquare(endPoint, opponent) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check left direction
      if (col - (shipLength - 1) >= 0) {
        endPoint = initialSquare - (shipLength - 1);
        if (this.isAvailableSquare(endPoint, opponent) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check down direction
      if (row + shipLength - 1 < 10) {
        endPoint = initialSquare + (shipLength - 1) * 10;
        if (this.isAvailableSquare(endPoint, opponent) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check up direction
      if (row - (shipLength - 1) >= 0) {
        endPoint = initialSquare - (shipLength - 1) * 10;
        if (this.isAvailableSquare(endPoint, opponent) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      return possibleEndPoints;
    },

    getSquares: function (
      square: number,
      opponent: gameBoardInterface,
    ): Set<number> {
      const availableSquares: Set<number> = new Set();
      const squares = this.possibleShipEndPoints(square, 2, opponent);

      squares.forEach((s) => {
        const available = this.isOpponentSquareAvailable(s, opponent);
        if (available) {
          availableSquares.add(s);
        }
      });

      return availableSquares;
    },

    removeAdjacentSquare: function (square: number) {
      this.possibleAttacks.delete(square);
    },

    setAttackOrientation: function (square: number) {
      if (
        square - this.initialHitSquare! === 10 ||
        this.initialHitSquare! - square === 10
      ) {
        this.attackOrientation = 'column';
      } else {
        this.attackOrientation = 'row';
      }
    },

    isRowAttack: function (square: number, adjacentSquare: number): boolean {
      const firstExpression = Math.abs(square - adjacentSquare);
      const isFirstTrue = firstExpression / 1 === 1;
      const secondExpression = Math.abs(
        this.initialHitSquare! - adjacentSquare,
      );
      const isSecondTrue = secondExpression / 1 === 1;
      return isFirstTrue || isSecondTrue;
    },

    isColAttack: function (square: number, adjacentSquare: number): boolean {
      const firstExpression = square - adjacentSquare;
      const isFirstTrue = firstExpression % 10 === 0;
      const secondExpression = adjacentSquare - square;
      const isSecondTrue = secondExpression % 10 === 0;
      return isFirstTrue || isSecondTrue;
    },

    getAttackPath: function (square: number): Set<number> {
      const attackPath: Set<number> = new Set();
      this.possibleAttacks.forEach((adjacentSquare) => {
        if (this.attackOrientation === 'column') {
          if (this.isColAttack(square, adjacentSquare)) {
            attackPath.add(adjacentSquare);
          }
        } else {
          if (this.isRowAttack(square, adjacentSquare)) {
            attackPath.add(adjacentSquare);
          }
        }
      });

      return attackPath;
    },

    resetProperties: function () {
      this.possibleAttacks.clear();
      this.initialHitSquare = 0;
      this.attackOrientation = 'none';
    },

    randomAttackLocation: function (
      player: gameBoardInterface,
      max: number,
      testNumber?: number,
    ): number {
      let location;

      if (testNumber) {
        location = testNumber;
      } else {
        location = Math.floor(Math.random() * max);
      }

      if (player.board[location].isHit || player.board[location].isMiss) {
        return this.randomAttackLocation(player, 100);
      }

      return location;
    },

    getMorePossibleAttacks: function (
      opponent: gameBoardInterface,
    ): Set<number> {
      const possibleAttacks: Set<number> = new Set();
      this.hitShips.forEach((ship) => {
        ship.hitLocations.forEach((location) => {
          const adjacentSquares = this.getSquares(location, opponent);
          adjacentSquares.forEach((square) => {
            possibleAttacks.add(square);
          });
        });
      });
      return possibleAttacks;
    },

    attackLogic: function (
      opponent: gameBoardInterface,
      testNumber?: number,
    ): number {
      let attackLocation: number;

      if (this.hitShips.size > 0 && this.possibleAttacks.size === 0) {
        this.possibleAttacks = this.getMorePossibleAttacks(opponent);
      }

      if (testNumber) {
        attackLocation = testNumber;
      } else if (this.hitShips.size > 0) {
        const array = [...this.possibleAttacks];
        attackLocation =
          array[this.randomAttackLocation(opponent, this.possibleAttacks.size)];
      } else {
        attackLocation = this.randomAttackLocation(opponent, 100);
      }

      if (this.possibleAttacks.size > 0) {
        this.removeAdjacentSquare(attackLocation);
      }

      if (opponent.board[attackLocation].ship?.sunk) {
        this.hitShips.delete(opponent.board[attackLocation].ship!);
        this.resetProperties();
        return attackLocation;
      }

      if (opponent.board[attackLocation].isHit && this.hitShips.size > 0) {
        this.setAttackOrientation(attackLocation);
        const squares = this.getSquares(attackLocation, opponent);
        squares.forEach((square) => {
          this.possibleAttacks.add(square);
        });
        const attackPath = this.getAttackPath(attackLocation);
        this.possibleAttacks = attackPath;
        this.hitShips.add(opponent.board[attackLocation].ship!);
      }

      if (opponent.board[attackLocation].isHit && this.hitShips.size === 0) {
        const squares = this.getSquares(attackLocation, opponent);
        this.possibleAttacks = squares;
        this.hitShips.add(opponent.board[attackLocation].ship!);
        this.initialHitSquare = attackLocation;
      }

      return attackLocation;
    },
  };
}
