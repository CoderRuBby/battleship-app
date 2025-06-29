import PlaceShips from './PlaceShips';
import AiGameBoard from './AiGameBoard';

class AiPlaceShips extends PlaceShips {
  AiGameBoard: AiGameBoard;

  constructor(AiGameBoard: AiGameBoard) {
    super(AiGameBoard);
    this.AiGameBoard = AiGameBoard;
  }

  randomSquare(max: number, testNumber?: number): number {
    let square;

    if (testNumber) {
      square = testNumber;
    } else {
      square = Math.floor(Math.random() * max);
    }

    if (this.AiGameBoard.selectedShip) {
      const shipPaths = this.getShipPaths(
        this.AiGameBoard.selectedShip.length,
        square,
      );
      if (this.isAvailableSquare(square) && shipPaths.length !== 0) {
        return square;
      }
    }

    return this.randomSquare(max);
  }

  placeShipOnGameBoard() {
    this.AiGameBoard.allShips.forEach((ship) => {
      this.AiGameBoard.selectedShip = ship;

      const square = this.randomSquare(100);
      ship.addShipStart(square);

      const shipPaths = this.getShipPaths(ship.length, square);

      const chosenPath =
        shipPaths[Math.floor(Math.random() * shipPaths.length)];

      const endPoint = chosenPath[chosenPath.length - 1];
      ship.addShipEndPoint(endPoint);

      chosenPath.forEach((location) => {
        this.AiGameBoard.gameboard[location].ship = ship;
      });

      ship.isPlaced = true;

      if (this.areAllShipsPlaced(this.AiGameBoard.allShips) === true) {
        this.AiGameBoard.allShipsPlaced = true;
      }
    });
  }
}

export default AiPlaceShips;
