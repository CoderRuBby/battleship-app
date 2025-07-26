import AiPlaceShips from './AiPlaceShips';
import GameBoard from './GameBoard';
import type Ship from './Ship';
import AdjacentSquares from './AdjacentSquares';

class AiGameBoard extends GameBoard {
  initialSquareHit: number | null;
  PlaceShips: AiPlaceShips;
  hitShips: Set<Ship>;
  TargetingSystem: AdjacentSquares;

  constructor() {
    super();
    this.initialSquareHit = null;
    this.PlaceShips = new AiPlaceShips(this);
    this.hitShips = new Set();
    this.TargetingSystem = new AdjacentSquares();
  }

  placeAll() {
    this.PlaceShips.placeShipOnGameBoard();
  }

  randomAttackLocation(
    Player: GameBoard,
    max: number,
    testNumber?: number,
  ): number {
    let location;

    if (testNumber) {
      location = testNumber;
    } else {
      location = Math.floor(Math.random() * max);
    }

    if (Player.gameboard[location].isHit || Player.gameboard[location].isMiss) {
      return this.randomAttackLocation(Player, 100);
    }

    return location;
  }

  attackLogic(Opponent: GameBoard, testNumber?: number) {
    let attackLocation;
    if (testNumber) {
      attackLocation = testNumber;
    } else if (this.hitShips.size > 0) {
      const array = [...this.TargetingSystem.possibleAttacks];
      attackLocation =
        array[
          this.randomAttackLocation(
            Opponent,
            this.TargetingSystem.possibleAttacks.size,
          )
        ];
    } else {
      attackLocation = this.randomAttackLocation(Opponent, 100);
    }

    if (this.TargetingSystem.possibleAttacks.size > 0) {
      this.TargetingSystem.removeAdjacentSquare(attackLocation);
    }
    this.attack(attackLocation, Opponent);

    if (Opponent.gameboard[attackLocation].ship?.sunk) {
      this.hitShips.delete(Opponent.gameboard[attackLocation].ship!);
      this.TargetingSystem.resetProperties();
      return attackLocation;
    }

    if (Opponent.gameboard[attackLocation].isHit && this.hitShips.size > 0) {
      this.TargetingSystem.setAttackOrientation(attackLocation);
      const squares = this.TargetingSystem.getSquares(attackLocation, Opponent);
      squares.forEach((square) => {
        this.TargetingSystem.possibleAttacks.add(square);
      });
      const attackPath = this.TargetingSystem.getAttackPath(attackLocation);
      this.TargetingSystem.possibleAttacks = attackPath;
    }

    if (Opponent.gameboard[attackLocation].isHit && this.hitShips.size === 0) {
      const squares = this.TargetingSystem.getSquares(attackLocation, Opponent);
      this.TargetingSystem.possibleAttacks = squares;
      this.hitShips.add(Opponent.gameboard[attackLocation].ship!);
      this.TargetingSystem.initialHitSquare = attackLocation;
    }

    return attackLocation;
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
