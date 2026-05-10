import type { gameBoardInterface } from './gameBoard';

export interface attackInterface {
  logic: (square: number, opponent: gameBoardInterface) => gameBoardInterface;
}

export default function attack() {
  const logic = (
    square: number,
    opponent: gameBoardInterface,
  ): gameBoardInterface => {
    const newBoard = { ...opponent };
    const attackedSquare = newBoard.board[square];
    const hasShip = opponent.board[square].ship !== null;
    const shipStartSquare = attackedSquare.ship?.props.shipStartPoint;
    switch (hasShip) {
      case true:
        attackedSquare.isHit = true;
        attackedSquare.ship?.isHit(square);
        if (attackedSquare.ship?.isSunk() && shipStartSquare) {
          newBoard.board[shipStartSquare].displayShipImage = true;
        }
        break;
      case false:
        newBoard.board[square].isMiss = true;
        break;
    }

    return newBoard;
  };
  return {
    logic,
  };
}
