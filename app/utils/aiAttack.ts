import attack from './Attack';
import type { gameBoardInterface } from './GameBoard';
import targetingSystem from './TargetingSystem';

export interface aiAttackInterface {
  logic: (opponent: gameBoardInterface, square?: number) => number;
}

export default function aiAttack() {
  return {
    logic: function (opponent: gameBoardInterface, square?: number): number {
      const newTargetingSystem = targetingSystem();
      const newAttackSystem = attack();
      let attackLocation: number;

      if (square) {
        attackLocation = square;
      } else {
        attackLocation = newTargetingSystem.attackLogic(opponent);
      }

      newAttackSystem.logic(attackLocation, opponent);

      return attackLocation;
    },
  };
}
