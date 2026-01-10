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
      const hasShip = opponent.board[square].ship !== null;
      switch (hasShip) {
        case true:
          opponent.board[square].isHit = true;
          opponent.board[square].ship?.isHit(square);
          break;
        case false:
          opponent.board[square].isMiss = true;
          break;
      }

      return opponent;
    },
  };
}
