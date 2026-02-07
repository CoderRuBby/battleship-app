import attack from './attack';
import type { gameBoardInterface } from './gameBoard';
import targetingSystem from './targetingSystem';

export interface aiAttackInterface {
  aiAttackLogic: (
    opponent: gameBoardInterface,
    square?: number,
  ) => [number, gameBoardInterface];
}

export default function aiAttack() {
  const aiAttackLogic = (
    opponent: gameBoardInterface,
    square?: number,
  ): [number, gameBoardInterface] => {
    const newTargetingSystem = targetingSystem();
    const newAttackSystem = attack();
    let attackLocation: number;

    if (square) {
      attackLocation = square;
    } else {
      attackLocation = newTargetingSystem.attackLogic(opponent);
    }

    const newOpponentBoard = newAttackSystem.logic(attackLocation, opponent);

    return [attackLocation, newOpponentBoard];
  };
  return {
    aiAttackLogic,
  };
}
