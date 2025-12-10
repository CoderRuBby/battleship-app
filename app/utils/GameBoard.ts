import type { shipInterface } from './Ship';

export interface gameBoardInterface {
  board: {
    id: number;
    isHit: boolean;
    isMiss: boolean;
    ship: shipInterface | null;
    imageNumber: number | null;
    imageDirection: string | null;
  }[];
  allShipsPlaced: boolean;
  allShips: shipInterface[];
  winner: boolean;
  isWinner: (opponentGameBoard: gameBoardInterface) => boolean;
  selectedShip: shipInterface | null;
}

export default function gameBoard(
  allShips: shipInterface[],
): gameBoardInterface {
  return {
    board: Array.from({ length: 100 }, (_, index) => ({
      id: index,
      isHit: false,
      isMiss: false,
      ship: null,
      imageNumber: null,
      imageDirection: null,
    })),
    allShipsPlaced: false,
    allShips: allShips,
    winner: false,
    isWinner: function (opponentGameBoard: gameBoardInterface): boolean {
      let winner = true;
      opponentGameBoard.allShips.forEach((ship) => {
        if (!ship.sunk) {
          winner = false;
        }
      });

      this.winner = winner;
      return winner;
    },
    selectedShip: null,
  };
}
