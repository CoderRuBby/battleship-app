export interface shipInterface {
export interface shipInterface {
  name: string;
  length: number;
  hit: number;
  sunk: boolean;
  shipStartPoint: number | null;
  shipEndPoint: number | null;
  isPlaced: boolean;
  placedLocations: number[];
  hitLocations: number[];
  isHit: (location: number) => void;
  isSunk: () => void;
  addShipStart: (squareNumber: number) => void;
  addShipEndPoint: (squareNumber: number) => void;
  getHitLocations: () => void;
}

export function ship(name: string, length: number): shipInterface {
  return {
    name: name,
    length: length,
    hit: 0,
    sunk: false,
    shipStartPoint: null,
    shipEndPoint: null,
    isPlaced: false,
    placedLocations: [],
    hitLocations: [],
    isHit: function (location: number) {
      this.hitLocations.push(location);
      this.hit++;
      this.isSunk();
    },
    isSunk: function () {
      if (this.hit === this.length) {
        this.sunk = true;
      }
    },
    addShipStart: function (squareNumber: number) {
      this.shipStartPoint = squareNumber;
    },
    addShipEndPoint: function (squareNumber: number) {
      this.shipEndPoint = squareNumber;
    },
    getHitLocations: function (): number[] {
      return this.hitLocations;
    },
  };
}
