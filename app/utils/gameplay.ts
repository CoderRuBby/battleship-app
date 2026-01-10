import aiAttack from './aiAttack';
import aiShipPlacementSystem from './aiShipPlacementSystem';
import attack from './Attack';
import type { gameBoardInterface } from './GameBoard';
import shipPlacement from './shipPlacementSystem';

export interface gamePlayInterface {
  playerTurn: (
    square: number,
    playerGameBoard: gameBoardInterface,
    opponentGameBoard: gameBoardInterface,
  ) => void;
  aiTurn: (
    ai: gameBoardInterface,
    Opponent?: gameBoardInterface,
    testSquare?: number,
  ) => number;
  isWinner: (
    playerGameBoard: gameBoardInterface,
    aiGameBoard: gameBoardInterface,
  ) => boolean;
  turn: (
    square: number,
    playerGameBoard: gameBoardInterface,
    aiGameBoard: gameBoardInterface,
  ) => void;
}

export default function gamePlay() {
  return {
    playerTurn: function (
      square: number,
      playerGameBoard: gameBoardInterface,
      opponentGameBoard: gameBoardInterface,
    ) {
      const attackSystem = attack();
      const shipPlacementSystem = shipPlacement(playerGameBoard);

      if (playerGameBoard.allShipsPlaced) {
        attackSystem.logic(square, opponentGameBoard);
        playerGameBoard.isWinner(opponentGameBoard);
      } else if (square) {
        shipPlacementSystem.shipPlacementLogic(square);
      }
    },
    aiTurn: function (
      ai: gameBoardInterface,
      Opponent?: gameBoardInterface,
      testSquare?: number | null,
    ): number {
      const newAiShipPlacementSystem = aiShipPlacementSystem(ai);
      const aiAttackSystem = aiAttack();
      let attackLocation: number;

      if (!testSquare && !Opponent) {
        newAiShipPlacementSystem.placeShipOnGameBoard();
      }

      if (Opponent) {
        if (testSquare) {
          const [location, obj] = aiAttackSystem.aiAttackLogic(
            Opponent,
            testSquare,
          );
          attackLocation = location;
        } else {
          const [location, obj] = aiAttackSystem.aiAttackLogic(Opponent);
          attackLocation = location;
        }
      }

      return attackLocation!;
    },
    isWinner: function (
      playerGameBoard: gameBoardInterface,
      aiGameBoard: gameBoardInterface,
    ): boolean {
      if (playerGameBoard.winner || aiGameBoard.winner) {
        return true;
      } else {
        return false;
      }
    },
    turn: function (
      square: number,
      playerGameBoard: gameBoardInterface,
      aiGameBoard: gameBoardInterface,
    ) {
      if (this.isWinner(playerGameBoard, aiGameBoard)) {
        return;
      }

      if (!playerGameBoard.allShipsPlaced) {
        this.playerTurn(square, playerGameBoard, aiGameBoard);
      }

      if (playerGameBoard.allShipsPlaced && !aiGameBoard.allShipsPlaced) {
        this.aiTurn(aiGameBoard);
      }

      if (playerGameBoard.allShipsPlaced && aiGameBoard.allShipsPlaced) {
        this.playerTurn(square, playerGameBoard, aiGameBoard);
        if (this.isWinner(playerGameBoard, aiGameBoard)) return;
        this.aiTurn(aiGameBoard, playerGameBoard);
      }
    },
  };
}
