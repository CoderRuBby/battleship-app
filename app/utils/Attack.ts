import GameBoard from './GameBoard';

class Attack {
  Opponent: GameBoard;

  constructor(Opponent: GameBoard) {
    this.Opponent = Opponent;
  }
  attack(square: number) {
    const hasShip = this.Opponent.gameboard[square].ship !== null;
    switch (hasShip) {
      case true:
        this.Opponent.gameboard[square].isHit = true;
        this.Opponent.gameboard[square].ship?.isHit();
        //! isWinner needs to be moved to turn()
        //this.isWinner(opponent);
        break;
      case false:
        this.Opponent.gameboard[square].isMiss = true;
        break;
    }
  }
}

export default Attack;
