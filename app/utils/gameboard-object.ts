import { SHIPS } from './game-ships';
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
  selectedShip: 'none' | Ship;
  allShipsPlaced: boolean;
  allShips: Ship[];

  constructor() {
    this.gameboard = {};
    this.initialize();
    this.Carrier = SHIPS.Carrier;
    this.Battleship = SHIPS.Battleship;
    this.Cruiser = SHIPS.Cruiser;
    this.Submarine = SHIPS.Submarine;
    this.Destroyer = SHIPS.Destroyer;
    this.selectedShip = 'none';
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
      this.selectedShip.shipStartPoint = 'none';
      this.selectedShip = 'none';
    } else {
      if (this.selectedShip !== 'none') {
        this.selectedShip.shipStartPoint = 'none';
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

  squareOnClick(squareNumber: number) {
    if (
      this.selectedShip !== 'none' &&
      this.selectedShip.shipStartPoint === 'none' &&
      this.isAvailableSquare(squareNumber) === true
    ) {
      this.selectedShip.shipStartPoint = squareNumber;
    } else if (
      this.selectedShip !== 'none' &&
      this.selectedShip.shipStartPoint !== 'none' &&
      this.canPlaceShip(squareNumber) === true
    ) {
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
      this.selectedShip !== 'none' &&
      this.selectedShip.shipStartPoint !== 'none'
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
    this.selectedShip = 'none';
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

  isAttacked(square: number) {
    const hasShip = this.gameboard[square].ship !== null;
    switch (hasShip) {
      case true:
        this.gameboard[square].isHit = true;
        this.gameboard[square].ship?.isHit();
        break;
      case false:
        this.gameboard[square].isMiss = true;
        break;
    }
  }
}
