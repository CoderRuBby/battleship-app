import GameBoard from './GameBoard';
import PlaceShips from './PlaceShips';
import Attack from './Attack';

class Turn {
  Player: GameBoard;
  PlayerPlaceShips: PlaceShips;
  Opponent: GameBoard;
  PlayerAttack: Attack;

  constructor(Player: GameBoard, Opponent: GameBoard) {
    this.Player = Player;
    this.PlayerPlaceShips = new PlaceShips(this.Player);
    this.Opponent = Opponent;
    this.PlayerAttack = new Attack(this.Opponent);
  }

  turn(square: number) {
    if (this.Player.allShipsPlaced) {
      this.PlayerAttack.attack(square);
    } else {
      this.PlayerPlaceShips.shipPlacement(square);
    }
  }
}

export default Turn;
