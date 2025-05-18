import { SHIPS } from './game-ships';

export default class GameBoard {
  gameboard: { [key: number]: Set<number | string> };
  Carrier: object;
  Battleship: object;
  Cruiser: object;
  Submarine: object;
  Destroyer: object;
  selectedShip: string | object;

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
      this.gameboard[i] = new Set();
    }
  }

  selectShip(ship: object) {
    if (ship === this.selectedShip) {
      this.selectedShip = 'none';
    } else {
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
}
