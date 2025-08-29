export type ShipType = {
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
  getHitLocations: () => number[];
};

export const Ship: (name: string, length: number) => ShipType = (
  name,
  length,
) => {
  const ship: ShipType = {
    name: name,
    length: length,
    hit: 0 as number,
    sunk: false as boolean,
    shipStartPoint: null as number | null,
    shipEndPoint: null as number | null,
    isPlaced: false as boolean,
    placedLocations: [] as number[],
    hitLocations: [] as number[],
    isHit: (location: number) => {
      ship.hitLocations.push(location);
      ship.hit++;
      ship.isSunk();
    },
    isSunk: () => {
      if (ship.hit === ship.length) {
        ship.sunk = true;
      }
    },
    addShipStart: (squareNumber: number) => {
      ship.shipStartPoint = squareNumber;
    },

    addShipEndPoint: (squareNumber: number) => {
      ship.shipEndPoint = squareNumber;
    },

    getHitLocations: (): number[] => {
      return ship.hitLocations;
    },
  };
  return ship;
};
