import GameBoard from './gameboard-object';
import Ship from './ship-object';

class AiGameBoard extends GameBoard {
  availableSquares: Set<number>;
  constructor() {
    super();
    this.availableSquares = new Set();
    this.initializeAvailableSquares();
  }

  initializeAvailableSquares() {
    for (let i = 0; i < 100; i++) {
      this.availableSquares.add(i);
    }
  }

  getShipStartPoint(ship: Ship, number: number) {
    const availableSquaresArray = [...this.availableSquares];
    const startPoint = availableSquaresArray[number];
    this.assignShipStartPoint(ship, startPoint);
  }

  getShipEndPoint(
    ship: Ship,
    possibleEndPointsArray: number[],
    arrayIndex: number,
  ) {
    this.assignShipEndPoint(ship, possibleEndPointsArray[arrayIndex]);
  }

  placeShip(
    shipsArray: Ship[],
    availableSquareIndex: number,
    endPointIndex: number,
  ) {
    shipsArray.forEach((ship) => {
      this.getShipStartPoint(ship, availableSquareIndex);
      if (ship.shipStartPoint !== 'none' && ship.shipEndPoint === 'none') {
        const possibleEndPoints = this.possibleShipEndPoints(
          ship.shipStartPoint,
          ship.length,
        );
        this.getShipEndPoint(ship, possibleEndPoints, endPointIndex);
      }
      if (ship.shipStartPoint !== 'none' && ship.shipEndPoint !== 'none') {
        this.placeShipOnGameBoard(ship, ship.shipStartPoint, ship.shipEndPoint);
        this.removePathFromAvailableSquares(
          this.possibleShipPath(
            ship.length,
            ship.shipStartPoint,
            ship.shipEndPoint,
          ),
        );
      }
    });
  }

  removePathFromAvailableSquares(path: number[]) {
    path.forEach((number) => {
      this.availableSquares.delete(number);
    });
  }
}

export default AiGameBoard;
