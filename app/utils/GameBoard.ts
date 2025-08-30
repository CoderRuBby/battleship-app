import type { ShipType } from './Ship';
//import PlaceShips from './PlaceShips';
//import Attack from './Attack';

export type GameBoardType = {
  ships: ShipType[];
  board: {
    [key: number]: { ship: ShipType | null; isHit: boolean; isMiss: boolean };
  };
  allShipsPlaced: boolean;
  allShips: ShipType[];
  winner: boolean;
  //placeShips: PlaceShips;
  selectedShip: null | ShipType;
  //NewAttack: Attack;
  initialize: () => void;
  //isWinner: (Opponent: GameBoardType) => void;
};

export const GameBoard: (ships: ShipType[]) => GameBoardType = (ships) => {
  const gameboard: GameBoardType = {
    ships: ships,
    board: {},
    allShipsPlaced: false as boolean,
    allShips: [] as ShipType[],
    winner: false as boolean,
    selectedShip: null as null | ShipType,
    initialize: () => {
      for (let i = 0; i < 100; i++) {
        gameboard.board[i] = {
          ship: null,
          isHit: false,
          isMiss: false,
        };
      }
    },
    /*get selectShip() {
      return (ship: ShipType) => gameboard.placeShips.selectShip(ship);
    },
    get shipPlacement() {
      return (square: number) =>
        gameboard.placeShips.shipPlacementLogic(square);
    },
    get attack() {
      return (Opponent: GameBoardType, square: number) =>
        gameboard.NewAttack.attack(square, Opponent);
    },
    get isWinner() {
      return (Opponent: GameBoardType) => {
        const winner = [];
        Opponent.ships.forEach((ship) => {
          if (ship.sunk) {
            winner.push(ship.name);
          }

          if (winner.length === Opponent.ships.length) {
            gameboard.winner = true;
          }
        });
      };
    },
    get turn() {
      return (square: number, opponent: GameBoardType) => {
        if (gameboard.allShipsPlaced) {
          gameboard.attack(opponent, square);
          gameboard.isWinner(opponent);
        } else if (square) {
          gameboard.shipPlacement(square);
        }
      };
    },*/
  };

  gameboard.initialize();

  return gameboard;
};
