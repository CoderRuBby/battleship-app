import GameBoard from './gameboard-object';

class AiGameBoard extends GameBoard {
  constructor() {
    super();
  }

  randomSquare(max: number, recursionCount = 0): number {
    if (recursionCount > max * 2) {
      throw new Error('Could not find a valid square');
    }

    const square = Math.floor(Math.random() * max);
    if (this.selectedShip) {
      const paths = this.getShipPaths(this.selectedShip.length, square);
      if (this.isAvailableSquare(square) || paths.length > 0) {
        return square;
      }
    }

    return this.randomSquare(max, recursionCount + 1);
  }

  assignShipStartPoint(square: number) {
    if (this.selectedShip !== null && this.isAvailableSquare(square) === true) {
      this.selectedShip.addShipStart(square);
    }
  }

  assignShipEndPoint(square: number) {
    if (
      this.selectedShip !== null &&
      this.selectedShip.shipEndPoint !== 'none'
    ) {
      this.selectedShip.addShipEndPoint(square);
    }
  }

  placeShipOnGameBoard() {
    const ships = [
      this.Carrier,
      this.Battleship,
      this.Cruiser,
      this.Submarine,
      this.Destroyer,
    ];

    ships.forEach((ship) => {
      this.selectShip(ship);
      const square = this.randomSquare(100);
      this.assignShipStartPoint(square);
      const endPoints = this.possibleShipEndPoints(square, ship.length);
      const endPoint = endPoints[Math.floor(Math.random() * endPoints.length)];
      this.assignShipEndPoint(endPoint);
      const shipPath = this.possibleShipPath(ship.length, square, endPoint);
      shipPath.forEach((location) => {
        this.gameboard[location].ship = ship;
        ship.isPlaced = true;
      });

      if (this.areAllShipsPlaced(ships) === true) {
        this.allShipsPlaced = true;
      }
    });
  }
}

export default AiGameBoard;
