import GameBoard from './GameBoard';

class AdjacentSquares {
  squaresArray: number[];

  constructor() {
    this.squaresArray = [];
  }

  isOpponentSquareAvailable(square: number, Opponent: GameBoard): boolean {
    if (Opponent.gameboard[square].isHit) {
      return false;
    } else {
      return true;
    }
  }

  isAvailableSquare(square: number, Opponent: GameBoard): boolean {
    if (Opponent.gameboard[square].ship === null) {
      return true;
    } else {
      return false;
    }
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

  getSquares(square: number, Opponent: GameBoard): number[] {
    const availableSquares: number[] = [];
    const squares = this.possibleShipEndPoints(square, 2, Opponent);

    squares.forEach((s) => {
      const available = this.isOpponentSquareAvailable(s, Opponent);
      if (available) {
        availableSquares.push(s);
        this.squaresArray.push(s);
      }
    });

    return availableSquares;
  }
}

export default AdjacentSquares;
