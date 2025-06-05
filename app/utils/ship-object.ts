export default class Ship {
  name: string;
  length: number;
  hit: number;
  sunk: boolean;
  shipStartPoint: number | 'none';
  shipEndPoint: number | 'none';
  isPlaced: boolean;

  constructor(name: string, length: number) {
    this.name = name;
    this.length = length;
    this.hit = 0;
    this.sunk = false;
    this.shipStartPoint = 'none';
    this.shipEndPoint = 'none';
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
