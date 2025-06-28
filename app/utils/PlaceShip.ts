import GameBoard from './GameBoard';
import Ship from './Ship';

class PlaceShip {
  PlayerGameBoard: GameBoard;
  selectedShip: null | Ship;

  constructor(PlayerGameBoard: GameBoard) {
    this.PlayerGameBoard = PlayerGameBoard;
    this.selectedShip = null;
  }

  selectShip(ship: Ship) {
    if (ship === this.selectedShip) {
      this.selectedShip.shipStartPoint = null;
      this.selectedShip = null;
    } else {
      if (this.selectedShip !== null) {
        this.selectedShip.shipStartPoint = null;
      }
      this.selectedShip = ship;
    }
  }

  isAvailableSquare(square: number): boolean {
    if (this.PlayerGameBoard.gameboard[square].ship === null) {
      return true;
    } else {
      return false;
    }
  }

  pathIsAvailable(path: number[]) {
    let isAvailable = true;
    path.forEach((square) => {
      if (this.isAvailableSquare(square) === false) {
        isAvailable = false;
      }
    });

    return isAvailable;
  }

  possibleShipEndPoints(initialSquare: number, shipLength: number): number[] {
    const possibleEndPoints: number[] = [];
    const row = Math.floor(initialSquare / 10);
    const col = initialSquare % 10;
    let endPoint: number;

    // Check right direction
    if (col + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1);
      if (this.isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check left direction
    if (col - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1);
      if (this.isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check down direction
    if (row + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1) * 10;
      if (this.isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check up direction
    if (row - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1) * 10;
      if (this.isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    return possibleEndPoints;
  }

  possibleShipPath(
    shipLength: number,
    shipStartPoint: number,
    shipEndPoint: number,
  ): number[] {
    const shipPath: number[] = [];

    if (shipEndPoint - shipStartPoint === (shipLength - 1) * 10) {
      for (let i = shipStartPoint; i <= shipEndPoint; i += 10) {
        shipPath.push(i);
      }
    } else if (shipStartPoint - shipEndPoint === (shipLength - 1) * 10) {
      for (let i = shipEndPoint; i <= shipStartPoint; i += 10) {
        shipPath.push(i);
      }
    } else if (shipStartPoint - shipEndPoint === shipLength - 1) {
      for (let i = shipEndPoint; i <= shipStartPoint; i += 1) {
        shipPath.push(i);
      }
    } else if (shipEndPoint - shipStartPoint === shipLength - 1) {
      for (let i = shipStartPoint; i <= shipEndPoint; i += 1) {
        shipPath.push(i);
      }
    }

    if (this.pathIsAvailable(shipPath) === false) return [];

    return shipPath;
  }

  getShipPaths(shipLength: number, shipStartPoint: number): number[][] {
    const shipPaths: number[][] = [];

    const shipEndPoints = this.possibleShipEndPoints(
      shipStartPoint,
      shipLength,
    );

    shipEndPoints.forEach((endPoint) => {
      const path = this.possibleShipPath(shipLength, shipStartPoint, endPoint);
      if (path.length !== 0) {
        shipPaths.push(path);
      }
    });

    return shipPaths;
  }

  canPlaceShip(square: number): boolean {
    let canPlace = true;
    if (
      this.selectedShip !== null &&
      this.selectedShip.shipStartPoint !== null
    ) {
      const shipPath = this.possibleShipPath(
        this.selectedShip.length,
        this.selectedShip.shipStartPoint,
        square,
      );
      shipPath.forEach((path) => {
        if (this.PlayerGameBoard.gameboard[path].ship !== null) {
          canPlace = false;
        }
      });
    } else {
      canPlace = false;
    }

    return canPlace;
  }

  //! Unnecessary function
  resetSelectedShip() {
    this.selectedShip = null;
  }

  areAllShipsPlaced(shipsArray: Ship[]) {
    let placed = true;
    shipsArray.forEach((ship) => {
      if (ship.isPlaced === false) {
        placed = false;
      }
    });
    return placed;
  }

  placeShipOnGameBoard(
    ship: Ship,
    shipStartPoint: number,
    shipEndPoint: number,
  ) {
    const path = this.possibleShipPath(
      ship.length,
      shipStartPoint,
      shipEndPoint,
    );
    path.forEach((location) => {
      this.PlayerGameBoard.gameboard[location].ship = ship;
    });

    ship.isPlaced = true;

    if (this.areAllShipsPlaced(this.PlayerGameBoard.allShips) === true) {
      this.PlayerGameBoard.allShipsPlaced = true;
    }
  }

  shipPlacement(squareNumber: number) {
    if (!this.selectedShip) return;

    if (this.selectedShip.shipStartPoint === null) {
      if (this.isAvailableSquare(squareNumber)) {
        this.selectedShip.shipStartPoint = squareNumber;
      }
      return;
    }

    if (this.canPlaceShip(squareNumber) === true) {
      this.selectedShip.addShipEndPoint(squareNumber);
      //! Remove following function
      this.placeShipOnGameBoard(
        this.selectedShip,
        this.selectedShip.shipStartPoint,
        squareNumber,
      );
      this.resetSelectedShip();
    }
  }
}

export default PlaceShip;
