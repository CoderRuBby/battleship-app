import AiPlaceShips from './AiPlaceShips';
import GameBoard from './GameBoard';
import TargetingSystem from './TargetingSystem';

class AiGameBoard extends GameBoard {
  initialSquareHit: number | null;
  PlaceShips: AiPlaceShips;
  NewTargetingSystem: TargetingSystem;

  constructor() {
    super();
    this.initialSquareHit = null;
    this.PlaceShips = new AiPlaceShips(this);
    this.NewTargetingSystem = new TargetingSystem();
  }

  placeAll() {
    this.PlaceShips.placeShipOnGameBoard();
  }

  attack(square: number, opponent: GameBoard) {
    super.attack(square, opponent);

    this.NewTargetingSystem.attackLogic(opponent);
  }

  /*
  turn(testSquare?: number | null, Opponent?: GameBoard) {
    let square: number;

    if (!testSquare && !Opponent) {
      this.placeAll();
    }

    if (Opponent) {
      if (testSquare) {
        square = testSquare;
      } else if (!testSquare && this.adjacentSquares.length === 0) {
        square = this.randomAttackLocation(Opponent);
      } else {
        square = this.getAdjacentAttack();
      }

      this.attack(square, Opponent);
    }
  }
    */
}

export default AiGameBoard;
