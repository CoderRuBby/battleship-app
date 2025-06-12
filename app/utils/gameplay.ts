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

    if (this.Player.allShipsPlaced && this.Ai.allShipsPlaced) {
      const aiAttackLocation = this.Ai.randomAttackLocation(this.Player);
      this.Player.turn(square, this.Ai);
      this.Ai.turn(aiAttackLocation, this.Player);
    }
  }
}

export default GamePlay;
