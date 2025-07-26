import GameBoard from './GameBoard';
import Ship from './Ship';

class TargetingSystem {
  possibleAttacks: Set<number>;
  initialHitSquare: number | null;
  attackOrientation: 'row' | 'column' | null;
  hitShips: Set<Ship>;

  constructor() {
    this.possibleAttacks = new Set();
    this.initialHitSquare = null;
    this.attackOrientation = null;
    this.hitShips = new Set();
  }

  isOpponentSquareAvailable(square: number, Opponent: GameBoard): boolean {
    if (Opponent.gameboard[square].isHit) {
      return false;
    } else {
      return true;
    }
  }

  isAvailableSquare(square: number, Opponent: GameBoard): boolean {
    return (
      !Opponent.gameboard[square].isHit && !Opponent.gameboard[square].isMiss
    );
  }

  possibleShipEndPoints(
    initialSquare: number,
    shipLength: number,
    Opponent: GameBoard,
  ): number[] {
    const possibleEndPoints: number[] = [];
    const row = Math.floor(initialSquare / 10);
    const col = initialSquare % 10;
    let endPoint: number;

    // Check right direction
    if (col + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1);
      if (this.isAvailableSquare(endPoint, Opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check left direction
    if (col - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1);
      if (this.isAvailableSquare(endPoint, Opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check down direction
    if (row + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1) * 10;
      if (this.isAvailableSquare(endPoint, Opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check up direction
    if (row - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1) * 10;
      if (this.isAvailableSquare(endPoint, Opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    return possibleEndPoints;
  }

  getSquares(square: number, Opponent: GameBoard): Set<number> {
    const availableSquares: Set<number> = new Set();
    const squares = this.possibleShipEndPoints(square, 2, Opponent);

    squares.forEach((s) => {
      const available = this.isOpponentSquareAvailable(s, Opponent);
      if (available) {
        availableSquares.add(s);
      }
    });

    return availableSquares;
  }

  removeAdjacentSquare(square: number) {
    this.possibleAttacks.delete(square);
  }

  setAttackOrientation(square: number) {
    if (
      square - this.initialHitSquare! === 10 ||
      this.initialHitSquare! - square === 10
    ) {
      this.attackOrientation = 'column';
    } else {
      this.attackOrientation = 'row';
    }
  }

  isRowAttack(square: number, adjacentSquare: number) {
    const firstExpression = Math.abs(square - adjacentSquare);
    const isFirstTrue = firstExpression / 1 === 1;
    const secondExpression = Math.abs(this.initialHitSquare! - adjacentSquare);
    const isSecondTrue = secondExpression / 1 === 1;
    return isFirstTrue || isSecondTrue;
  }

  isColAttack(square: number, adjacentSquare: number) {
    const firstExpression = square - adjacentSquare;
    const isFirstTrue = firstExpression % 10 === 0;
    const secondExpression = adjacentSquare - square;
    const isSecondTrue = secondExpression % 10 === 0;
    return isFirstTrue || isSecondTrue;
  }

  getAttackPath(square: number): Set<number> {
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
  }

  resetProperties() {
    this.possibleAttacks.clear();
    this.initialHitSquare = null;
    this.attackOrientation = null;
  }

  randomAttackLocation(
    Player: GameBoard,
    max: number,
    testNumber?: number,
  ): number {
    let location;

    if (testNumber) {
      location = testNumber;
    } else {
      location = Math.floor(Math.random() * max);
    }

    if (Player.gameboard[location].isHit || Player.gameboard[location].isMiss) {
      return this.randomAttackLocation(Player, 100);
    }

    return location;
  }

  getMorePossibleAttacks(opponent: GameBoard): Set<number> {
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
  }

  attackLogic(Opponent: GameBoard, testNumber?: number) {
    let attackLocation;

    if (this.hitShips.size > 0 && this.possibleAttacks.size === 0) {
      this.possibleAttacks = this.getMorePossibleAttacks(Opponent);
    }

    if (testNumber) {
      attackLocation = testNumber;
    } else if (this.hitShips.size > 0) {
      const array = [...this.possibleAttacks];
      attackLocation =
        array[this.randomAttackLocation(Opponent, this.possibleAttacks.size)];
    } else {
      attackLocation = this.randomAttackLocation(Opponent, 100);
    }

    if (this.possibleAttacks.size > 0) {
      this.removeAdjacentSquare(attackLocation);
    }

    if (Opponent.gameboard[attackLocation].ship?.sunk) {
      this.hitShips.delete(Opponent.gameboard[attackLocation].ship!);
      this.resetProperties();
      return attackLocation;
    }

    if (Opponent.gameboard[attackLocation].isHit && this.hitShips.size > 0) {
      this.setAttackOrientation(attackLocation);
      const squares = this.getSquares(attackLocation, Opponent);
      squares.forEach((square) => {
        this.possibleAttacks.add(square);
      });
      const attackPath = this.getAttackPath(attackLocation);
      this.possibleAttacks = attackPath;
      this.hitShips.add(Opponent.gameboard[attackLocation].ship!);
    }

    if (Opponent.gameboard[attackLocation].isHit && this.hitShips.size === 0) {
      const squares = this.getSquares(attackLocation, Opponent);
      this.possibleAttacks = squares;
      this.hitShips.add(Opponent.gameboard[attackLocation].ship!);
      this.initialHitSquare = attackLocation;
    }

    return attackLocation;
  }
}

export default TargetingSystem;
