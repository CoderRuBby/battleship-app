import GameBoard from './GameBoard';

class Attack {
  constructor() {}
  attack(square: number, Opponent: GameBoard) {
    const hasShip = Opponent.gameboard[square].ship !== null;
    switch (hasShip) {
      case true:
        Opponent.gameboard[square].isHit = true;
        Opponent.gameboard[square].ship?.isHit();
        //! isWinner needs to be moved to turn()
        //this.isWinner(opponent);
        break;
      case false:
        Opponent.gameboard[square].isMiss = true;
        break;
    }
  }
}

export default Attack;
