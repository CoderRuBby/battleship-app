import AiPlaceShips from './AiPlaceShips';
import GameBoard from './GameBoard';

class AiGameBoard extends GameBoard {
  adjacentSquares: number[];
  initialSquareHit: number | null;
  PlaceShips: AiPlaceShips;

  constructor() {
    super();
    this.adjacentSquares = [];
    this.initialSquareHit = null;
    this.PlaceShips = new AiPlaceShips(this);
  }

  placeAll() {
    this.PlaceShips.placeShipOnGameBoard();
  }

  randomAttackLocation(Player: GameBoard): number {
    const location = Math.floor(Math.random() * 100);
    if (Player.gameboard[location].isHit || Player.gameboard[location].isMiss) {
      return this.randomAttackLocation(Player);
    }

    return location;
  }

  isOpponentSquareAvailable(square: number, Opponent: GameBoard): boolean {
    if (Opponent.gameboard[square].isHit) {
      return false;
    } else {
      return true;
    }
  }

  getAdjacentSquares(square: number, Opponent: GameBoard): number[] {
    const availableSquares: number[] = [];
    const squares = this.possibleShipEndPoints(square, 2);

    squares.forEach((s) => {
      const available = this.isOpponentSquareAvailable(s, Opponent);
      if (available) {
        availableSquares.push(s);
        this.adjacentSquares.push(s);
      }
    });

    return availableSquares;
  }

  getAdjacentAttack(): number {
    const index = Math.floor(Math.random() * this.adjacentSquares.length);
    return this.adjacentSquares[index];
  }

  removeAdjacentSquare(square: number) {
    const squares: number[] = [];
    this.adjacentSquares.forEach((s) => {
      if (s !== square) {
        squares.push(s);
      }
    });

    this.adjacentSquares = squares;
  }

  isRowAttack(initialSquare: number, square: number) {
    return Math.abs(initialSquare - square) === 1;
  }

  isColAttack(initialSquare: number, square: number) {
    return Math.abs(initialSquare - square) === 10;
  }

  getAttackOrientation(square: number) {
    // Filter adjacent squares to only those in the same orientation as our hits
    this.adjacentSquares = this.adjacentSquares.filter((adjacentSquare) => {
      // Check if ai is attacking horizontally
      if (this.isRowAttack(this.initialSquareHit!, square)) {
        // Keep horizontal squares
        return this.isRowAttack(this.initialSquareHit!, adjacentSquare);
      } else {
        // Keep vertical squares
        return this.isColAttack(this.initialSquareHit!, adjacentSquare);
      }
    });
  }

  addRowColSquare(square: number) {
    let adjSquares = this.possibleShipEndPoints(square, 2);
    adjSquares = adjSquares.filter((adjSquare) => {
      if (this.isRowAttack(this.initialSquareHit!, square)) {
        return this.isRowAttack(square, adjSquare);
      } else {
        return this.isColAttack(square, adjSquare);
      }
    });

    this.adjacentSquares.push(adjSquares[0]);
  }

  attack(square: number, Opponent: GameBoard) {
    const hasShip = Opponent.gameboard[square].ship !== null;

    super.attack(square, Opponent);

    // Ai logic after its second hit on an opponents ship
    if (this.adjacentSquares.length > 0 && hasShip && this.initialSquareHit) {
      this.getAttackOrientation(square);
      this.addRowColSquare(square);
    }

    if (hasShip && this.adjacentSquares.length === 0) {
      this.getAdjacentSquares(square, Opponent);
      this.initialSquareHit = square;
    }

    if (this.adjacentSquares.length > 0) {
      this.removeAdjacentSquare(square);
    }
  }

  turn(testSquare?: number | null, Opponent?: GameBoard) {
    let square: number;

    if (!testSquare && !Opponent) {
      this.placeAll();
    }

    if (Opponent) {
      if (testSquare) {
        square = testSquare;
      } else if (!testSquare && this.adjacentSquares.length === 0) {
        square = this.randomAttackLocation(Opponent);
      } else {
        square = this.getAdjacentAttack();
      }

      this.attack(square, Opponent);
    }
  }
}

export default AiGameBoard;
