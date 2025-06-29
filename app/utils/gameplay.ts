import AiGameBoard from './AiGameBoard';
import GameBoard from './GameBoard';

class GamePlay {
  Player: GameBoard;
  Ai: AiGameBoard;
  constructor(Player: GameBoard, Ai: AiGameBoard) {
    this.Player = Player;
    this.Ai = Ai;
  }

  isWinner(): boolean {
    if (this.Player.winner || this.Ai.winner) {
      return true;
    }
    return false;
  }

  turn(square: number) {
    if (this.isWinner()) {
      return;
    }

    if (!this.Player.allShipsPlaced) {
      this.Player.turn(square, this.Ai);
    }

    if (this.Player.allShipsPlaced && !this.Ai.allShipsPlaced) {
      this.Ai.turn();
    }

    if (this.Player.allShipsPlaced && this.Ai.allShipsPlaced) {
      this.Player.turn(square, this.Ai);
      if (this.isWinner()) return;
      this.Ai.turn(null, this.Player);
    }
  }
}

export default GamePlay;
