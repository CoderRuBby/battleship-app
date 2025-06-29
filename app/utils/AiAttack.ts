import Attack from './Attack';
import GameBoard from './GameBoard';

class AiAttack extends Attack {
  constructor() {
    super();
  }

  randomAttackLocation(Player: GameBoard): number {
    const location = Math.floor(Math.random() * 100);
    if (Player.gameboard[location].isHit || Player.gameboard[location].isMiss) {
      return this.randomAttackLocation(Player);
    }

    return location;
  }
}

export default AiAttack;
