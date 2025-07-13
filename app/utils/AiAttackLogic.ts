import Attack from './Attack';
import GameBoard from './GameBoard';

class AiAttackLogic extends Attack {
  constructor() {
    super();
  }

  randomAttackLocation(Player: GameBoard, testNumber?: number): number {
    let location;

    if (testNumber) {
      location = testNumber;
    } else {
      location = Math.floor(Math.random() * 100);
    }

    if (Player.gameboard[location].isHit || Player.gameboard[location].isMiss) {
      return this.randomAttackLocation(Player);
    }

    return location;
  }

  normalAttack(Player: GameBoard) {
    const randomLocation = this.randomAttackLocation(Player);

    super.attack(randomLocation, Player);

    return randomLocation;
  }
}

export default AiAttackLogic;
