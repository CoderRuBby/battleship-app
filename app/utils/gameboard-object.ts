import Ship from './ship-object';

export default class GameBoard {
  gameboard: {
    [key: number]: { ship: Ship | null; isHit: boolean; isMiss: boolean };
  };
  Carrier: Ship;
  Battleship: Ship;
  Cruiser: Ship;
  Submarine: Ship;
  Destroyer: Ship;
  selectedShip: null | Ship;
  allShipsPlaced: boolean;
  allShips: Ship[];

  constructor() {
    this.gameboard = {};
    this.initialize();
    this.Carrier = new Ship('carrier', 5);
    this.Battleship = new Ship('battleship', 4);
    this.Cruiser = new Ship('cruiser', 3);
    this.Submarine = new Ship('submarine', 3);
    this.Destroyer = new Ship('destroyer', 2);
    this.selectedShip = null;
    this.allShipsPlaced = false;
    this.allShips = [
      this.Battleship,
      this.Carrier,
      this.Cruiser,
      this.Destroyer,
      this.Submarine,
    ];
  }

  initialize() {
    for (let i = 0; i < 100; i++) {
      this.gameboard[i] = {
        ship: null,
        isHit: false,
        isMiss: false,
      };
    }
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

  pathIsAvailable(path: number[]) {
    let isAvailable = true;
    path.forEach((square) => {
      if (this.isAvailableSquare(square) === false) {
        isAvailable = false;
      }
    });

    return isAvailable;
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
      this.gameboard[location].ship = ship;
    });

    ship.isPlaced = true;

    if (this.areAllShipsPlaced(this.allShips) === true) {
      this.allShipsPlaced = true;
    }
  }

  shipOnClick(ship: Ship) {
    this.selectShip(ship);
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
      this.placeShipOnGameBoard(
        this.selectedShip,
        this.selectedShip.shipStartPoint,
        squareNumber,
      );
      this.resetSelectedShip();
    }
  }

  isAvailableSquare(square: number): boolean {
    if (this.gameboard[square].ship === null) {
      return true;
    } else {
      return false;
    }
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
        if (this.gameboard[path].ship !== null) {
          canPlace = false;
        }
      });
    } else {
      canPlace = false;
    }

    return canPlace;
  }

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

  attack(square: number, opponent: GameBoard) {
    const hasShip = opponent.gameboard[square].ship !== null;
    switch (hasShip) {
      case true:
        opponent.gameboard[square].isHit = true;
        opponent.gameboard[square].ship?.isHit();
        break;
      case false:
        opponent.gameboard[square].isMiss = true;
        break;
    }
  }

  turn(square: number, opponent?: GameBoard) {
    if (!opponent) {
      this.shipPlacement(square);
    } else {
      this.attack(square, opponent);
    }
  }
}
