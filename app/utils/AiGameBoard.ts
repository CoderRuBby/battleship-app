import AiPlaceShips from './AiPlaceShips';
import GameBoard from './GameBoard';
import type Ship from './Ship';
import TargetingSystem from './TargetingSystem';

class AiGameBoard extends GameBoard {
  initialSquareHit: number | null;
  PlaceShips: AiPlaceShips;
  hitShips: Set<Ship>;
  NewTargetingSystem: TargetingSystem;

  constructor() {
    super();
    this.initialSquareHit = null;
    this.PlaceShips = new AiPlaceShips(this);
    this.hitShips = new Set();
    this.NewTargetingSystem = new TargetingSystem();
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

  getMorePossibleAttacks(opponent: GameBoard): Set<number> {
    const possibleAttacks: Set<number> = new Set();
    this.hitShips.forEach((ship) => {
      ship.hitLocations.forEach((location) => {
        const adjacentSquares = this.NewTargetingSystem.getSquares(
          location,
          opponent,
        );
        adjacentSquares.forEach((square) => {
          possibleAttacks.add(square);
        });
      });
    });
    return possibleAttacks;
  }

  attackLogic(Opponent: GameBoard, testNumber?: number) {
    let attackLocation;

    if (
      this.hitShips.size > 0 &&
      this.NewTargetingSystem.possibleAttacks.size === 0
    ) {
      this.NewTargetingSystem.possibleAttacks =
        this.getMorePossibleAttacks(Opponent);
    }

    if (testNumber) {
      attackLocation = testNumber;
    } else if (this.hitShips.size > 0) {
      const array = [...this.NewTargetingSystem.possibleAttacks];
      attackLocation =
        array[
          this.randomAttackLocation(
            Opponent,
            this.NewTargetingSystem.possibleAttacks.size,
          )
        ];
    } else {
      attackLocation = this.randomAttackLocation(Opponent, 100);
    }

    if (this.NewTargetingSystem.possibleAttacks.size > 0) {
      this.NewTargetingSystem.removeAdjacentSquare(attackLocation);
    }
    this.attack(attackLocation, Opponent);

    if (Opponent.gameboard[attackLocation].ship?.sunk) {
      this.hitShips.delete(Opponent.gameboard[attackLocation].ship!);
      this.NewTargetingSystem.resetProperties();
      return attackLocation;
    }

    if (Opponent.gameboard[attackLocation].isHit && this.hitShips.size > 0) {
      this.NewTargetingSystem.setAttackOrientation(attackLocation);
      const squares = this.NewTargetingSystem.getSquares(
        attackLocation,
        Opponent,
      );
      squares.forEach((square) => {
        this.NewTargetingSystem.possibleAttacks.add(square);
      });
      const attackPath = this.NewTargetingSystem.getAttackPath(attackLocation);
      this.NewTargetingSystem.possibleAttacks = attackPath;
      this.hitShips.add(Opponent.gameboard[attackLocation].ship!);
    }

    if (Opponent.gameboard[attackLocation].isHit && this.hitShips.size === 0) {
      const squares = this.NewTargetingSystem.getSquares(
        attackLocation,
        Opponent,
      );
      this.NewTargetingSystem.possibleAttacks = squares;
      this.hitShips.add(Opponent.gameboard[attackLocation].ship!);
      this.NewTargetingSystem.initialHitSquare = attackLocation;
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
