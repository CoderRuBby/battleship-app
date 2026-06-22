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
    const hasShip = attackedSquare.ship !== null;
    switch (hasShip) {
      case true:
        attackedSquare.isHit = true;
        attackedSquare.ship?.isHit(square);
        break;
      case false:
        attackedSquare.isMiss = true;
        break;
    }

    return newBoard;
  };
  return {
    logic,
  };
}
