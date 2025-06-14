import GameBoard from './GameBoard';

class AiGameBoard extends GameBoard {
  adjacentSquares: number[];

  constructor() {
    super();
    this.adjacentSquares = [];
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

  getAdjacentAttack() {
    if (this.adjacentSquares) {
      const index = Math.floor(Math.random() * this.adjacentSquares.length);
      return this.adjacentSquares[index];
    }
  }

  attack(square: number, Opponent: GameBoard) {
    const hasShip = Opponent.gameboard[square].ship !== null;

    super.attack(square, Opponent);

    if (hasShip) {
      this.getAdjacentSquares(square, Opponent);
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
      } else {
        square = this.randomAttackLocation(Opponent);
      }

      this.attack(square, Opponent);
    }
  }
}

export default AiGameBoard;
