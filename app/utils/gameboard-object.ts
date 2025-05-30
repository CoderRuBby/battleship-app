import { SHIPS } from './game-ships';
import Ship from './ship-object';

export default class GameBoard {
  gameboard: { [key: number]: { ship: Ship | null } };
  Carrier: Ship;
  Battleship: Ship;
  Cruiser: Ship;
  Submarine: Ship;
  Destroyer: Ship;
  selectedShip: 'none' | Ship;

  constructor() {
    this.gameboard = {};
    this.initialize();
    this.Carrier = SHIPS.Carrier;
    this.Battleship = SHIPS.Battleship;
    this.Cruiser = SHIPS.Cruiser;
    this.Submarine = SHIPS.Submarine;
    this.Destroyer = SHIPS.Destroyer;
    this.selectedShip = 'none';
  }

  initialize() {
    for (let i = 0; i < 100; i++) {
      this.gameboard[i] = {
        ship: null,
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

    // Check right direction
    if (col + shipLength - 1 < 10) {
      possibleEndPoints.push(initialSquare + (shipLength - 1));
    }

    // Check left direction
    if (col - (shipLength - 1) >= 0) {
      possibleEndPoints.push(initialSquare - (shipLength - 1));
    }

    // Check down direction
    if (row + shipLength - 1 < 10) {
      possibleEndPoints.push(initialSquare + (shipLength - 1) * 10);
    }

    // Check up direction
    if (row - (shipLength - 1) >= 0) {
      possibleEndPoints.push(initialSquare - (shipLength - 1) * 10);
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

    return shipPath;
  }

  getShipPaths(shipLength: number, shipStartPoint: number): number[][] {
    const shipPaths: number[][] = [];

    const shipEndPoints = this.possibleShipEndPoints(
      shipStartPoint,
      shipLength,
    );

    shipEndPoints.forEach((endPoint) => {
      shipPaths.push(
        this.possibleShipPath(shipLength, shipStartPoint, endPoint),
      );
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
      this.assignShipStartPoint(this.selectedShip, squareNumber);
    } else if (
      this.selectedShip !== 'none' &&
      this.selectedShip.shipStartPoint !== 'none' &&
      this.canPlaceShip(squareNumber) === true
    ) {
      this.assignShipEndPoint(this.selectedShip, squareNumber);
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

  assignShipStartPoint(ship: Ship, square: number) {
    ship.addShipStart(square);
  }

  assignShipEndPoint(ship: Ship, square: number) {
    ship.addShipEndPoint(square);
  }
}
