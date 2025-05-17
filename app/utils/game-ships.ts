import Ship from './ship-object';

export const SHIPS = {
  Carrier: new Ship('carrier', 5),
  Battleship: new Ship('battleship', 4),
  Cruiser: new Ship('cruiser', 3),
  Submarine: new Ship('submarine', 3),
  Destroyer: new Ship('destroyer', 2),
};
