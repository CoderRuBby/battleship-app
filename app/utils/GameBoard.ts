import Ship from './Ship';
import PlaceShips from './PlaceShips';

export default class GameBoard {
  gameboard: {
    [key: number]: { ship: Ship | null; isHit: boolean; isMiss: boolean };
  };
  Carrier: Ship;
  Battleship: Ship;
  Cruiser: Ship;
  Submarine: Ship;
  Destroyer: Ship;
  allShipsPlaced: boolean;
  allShips: Ship[];
  winner: boolean;
  placeShips: PlaceShips;
  selectedShip: null | Ship;

  constructor() {
    this.gameboard = {};
    this.initialize();
    this.Carrier = new Ship('carrier', 5);
    this.Battleship = new Ship('battleship', 4);
    this.Cruiser = new Ship('cruiser', 3);
    this.Submarine = new Ship('submarine', 3);
    this.Destroyer = new Ship('destroyer', 2);
    this.allShipsPlaced = false;
    this.allShips = [
      this.Battleship,
      this.Carrier,
      this.Cruiser,
      this.Destroyer,
      this.Submarine,
    ];
    this.winner = false;
    this.placeShips = new PlaceShips(this);
    this.selectedShip = null;
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
    this.placeShips.selectShip(ship);
  }

  turn(square: number, opponent?: GameBoard) {
    if (square && opponent) {
      this.attack(square, opponent);
    } else if (square) {
      this.shipPlacement(square);
    }
  }

  isWinner(Opponent: GameBoard) {
    if (
      Opponent.Battleship.sunk &&
      Opponent.Carrier.sunk &&
      Opponent.Submarine.sunk &&
      Opponent.Destroyer.sunk &&
      Opponent.Cruiser.sunk
    ) {
      this.winner = true;
    }
  }
}
