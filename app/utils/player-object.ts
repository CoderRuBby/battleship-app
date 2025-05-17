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
}
