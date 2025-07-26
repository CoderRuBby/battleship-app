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

  attack(opponent: GameBoard, square?: number): number {
    let attackLocation: number;

    if (square) {
      attackLocation = square;
    } else {
      attackLocation = this.NewTargetingSystem.attackLogic(opponent);
    }

    super.attack(opponent, attackLocation);

    return attackLocation;
  }

  turn(testSquare?: number | null, Opponent?: GameBoard): number {
    let attackLocation: number;

    if (!testSquare && !Opponent) {
      this.placeAll();
    }

    if (Opponent) {
      if (testSquare) {
        attackLocation = this.attack(Opponent, testSquare);
      } else {
        attackLocation = this.attack(Opponent);
      }
    }

    return attackLocation!;
  }
}

export default AiGameBoard;
