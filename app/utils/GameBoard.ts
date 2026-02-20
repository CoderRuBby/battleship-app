import type { shipInterface } from './ship';

export interface gameBoardInterface {
  board: {
    id: number;
    isHit: boolean;
    isMiss: boolean;
    ship: shipInterface | null;
    imageNumber: number | null;
    imageDirection: string | null;
  }[];
  props: {
    allShipsPlaced: boolean;
    winner: boolean;
    selectedShip: shipInterface | null;
    allShips: shipInterface[];
    aiPlayer: boolean;
  };
  isWinner: (opponentGameBoard: gameBoardInterface) => boolean;
}

export default function gameBoard(
  allShipsArray: shipInterface[],
  aiPlayer: boolean = false,
): gameBoardInterface {
  const board = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    isHit: false,
    isMiss: false,
    ship: null,
    imageNumber: null,
    imageDirection: null,
  }));
  const props: gameBoardInterface['props'] = {
    allShipsPlaced: false,
    allShips: allShipsArray,
    winner: false,
    selectedShip: null,
    aiPlayer,
  };
  const isWinner = (opponentGameBoard: gameBoardInterface): boolean => {
    let winner: boolean = true;
    opponentGameBoard.props.allShips.forEach((ship) => {
      if (!ship.props.sunk) {
        winner = false;
      }
    });

    props.winner = winner;
    return winner;
  };
  return {
    board,
    props,
    isWinner,
  };
}
