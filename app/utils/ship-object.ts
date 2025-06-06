export default class Ship {
  name: string;
  length: number;
  hit: number;
  sunk: boolean;
  shipStartPoint: number | null;
  shipEndPoint: number | null;
  isPlaced: boolean;

  constructor(name: string, length: number) {
    this.name = name;
    this.length = length;
    this.hit = 0;
    this.sunk = false;
    this.shipStartPoint = null;
    this.shipEndPoint = null;
    this.isPlaced = false;
  }

  isHit() {
    this.hit++;
    this.isSunk();
  }

  isSunk() {
    if (this.hit === this.length) {
      this.sunk = true;
    }
  }

  addShipStart(squareNumber: number) {
    this.shipStartPoint = squareNumber;
  }

  addShipEndPoint(squareNumber: number) {
    this.shipEndPoint = squareNumber;
  }
}
