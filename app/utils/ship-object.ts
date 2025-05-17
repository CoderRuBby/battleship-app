export default class Ship {
  name: string;
  length: number;
  hit: number;
  sunk: boolean;

  constructor(name: string, length: number) {
    this.name = name;
    this.length = length;
    this.hit = 0;
    this.sunk = false;
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
}
