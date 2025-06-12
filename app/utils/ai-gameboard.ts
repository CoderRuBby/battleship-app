import GameBoard from './gameboard-object';

class AiGameBoard extends GameBoard {
  constructor() {
    super();
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

  turn(square?: number, opponent?: GameBoard) {
    if (square && opponent) {
      this.attack(square, opponent);
    } else {
      this.placeShipOnGameBoard();
    }
  }
}

export default AiGameBoard;
