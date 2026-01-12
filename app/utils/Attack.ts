import type { gameBoardInterface } from './GameBoard';

export interface attackInterface {
  logic: (square: number, opponent: gameBoardInterface) => gameBoardInterface;
}

export default function attack() {
  return {
    logic: function (
      square: number,
      opponent: gameBoardInterface,
    ): gameBoardInterface {
      const newBoard = { ...opponent };
      const hasShip = opponent.board[square].ship !== null;
      switch (hasShip) {
        case true:
          newBoard.board[square].isHit = true;
          newBoard.board[square].ship?.isHit(square);
          break;
        case false:
          newBoard.board[square].isMiss = true;
          break;
      }

      return newBoard;
    },
  };
}
