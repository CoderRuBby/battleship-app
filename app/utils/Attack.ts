import type { GameBoardType } from './GameBoard';

export type AttackType = {
  attack: (square: number, Opponent: GameBoardType) => void;
};

export const Attack: () => AttackType = () => {
  const controller: AttackType = {
    attack: (square: number, Opponent: GameBoardType) => {
      const hasShip = Opponent.board[square].ship !== null;
      switch (hasShip) {
        case true:
          Opponent.board[square].isHit = true;
          Opponent.board[square].ship?.isHit(square);
          break;
        case false:
          Opponent.board[square].isMiss = true;
          break;
      }
    },
  };

  return controller;
};
