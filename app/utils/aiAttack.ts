import attack from './Attack';
import type { gameBoardInterface } from './GameBoard';
import targetingSystem from './TargetingSystem';

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
