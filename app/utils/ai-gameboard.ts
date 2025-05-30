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

  }
}

export default AiGameBoard;
