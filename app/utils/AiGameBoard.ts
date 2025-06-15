import GameBoard from './GameBoard';

class AiGameBoard extends GameBoard {
  adjacentSquares: number[];
  initialSquareHit: number | null;

  constructor() {
    super();
    this.adjacentSquares = [];
    this.initialSquareHit = null;
  }

  randomSquare(max: number, recursionCount = 0): number {
    const square = Math.floor(Math.random() * max);

    if (recursionCount > max * 2) {
      throw new Error('Could not find a valid square');
    }

    if (this.selectedShip) {
      const shipPaths = this.getShipPaths(this.selectedShip.length, square);
      if (this.isAvailableSquare(square) && shipPaths.length !== 0) {
        return square;
      }
    }

    return this.randomSquare(max, recursionCount + 1);
  }

  placeShipOnGameBoard() {
    this.allShips.forEach((ship) => {
      this.selectedShip = ship;

      const square = this.randomSquare(100);
      ship.addShipStart(square);

      const shipPaths = this.getShipPaths(ship.length, square);

      const chosenPath =
        shipPaths[Math.floor(Math.random() * shipPaths.length)];

      const endPoint = chosenPath[chosenPath.length - 1];
      ship.addShipEndPoint(endPoint);

      chosenPath.forEach((location) => {
        this.gameboard[location].ship = ship;
      });

      ship.isPlaced = true;

      if (this.areAllShipsPlaced(this.allShips) === true) {
        this.allShipsPlaced = true;
      }
    });
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

  attack(square: number, Opponent: GameBoard) {
    const hasShip = Opponent.gameboard[square].ship !== null;

    super.attack(square, Opponent);

    // Ai logic after its second hit on an opponents ship
    if (this.adjacentSquares.length > 0 && hasShip && this.initialSquareHit) {
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
      this.placeShipOnGameBoard();
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
