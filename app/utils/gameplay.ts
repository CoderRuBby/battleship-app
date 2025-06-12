import type AiGameBoard from './ai-gameboard';
import GameBoard from './gameboard-object';

class GamePlay {
  Player: GameBoard;
  Ai: AiGameBoard;
  constructor(Player: GameBoard, Ai: AiGameBoard) {
    this.Player = Player;
    this.Ai = Ai;
  }

  turn(square: number) {
    if (!this.Player.allShipsPlaced) {
      this.Player.turn(square);
    }

    if (this.Player.allShipsPlaced && !this.Ai.allShipsPlaced) {
      this.Ai.turn();
    }
  }
}

export default GamePlay;
