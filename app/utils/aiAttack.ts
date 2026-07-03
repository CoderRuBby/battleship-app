import attack from './attack';
import type { gameBoardInterface } from './gameBoard';
import targetingSystem from '~/utils/targetingSystem';

export interface aiAttackInterface {
  randomAttackLocation: (
    player: gameBoardInterface,
    max: number,
    testNumber?: number,
  ) => number;
  aiAttackLogic: (
    opponent: gameBoardInterface,
    square?: number,
  ) => [number, gameBoardInterface];
}

export default function aiAttack() {
  const newTargetingSystem = targetingSystem();
  const newAttackSystem = attack();

  const randomAttackLocation = (
    player: gameBoardInterface,
    max: number,
    testNumber?: number,
  ): number => {
    let location;

    if (testNumber) {
      location = testNumber;
    } else {
      location = Math.floor(Math.random() * max);
    }

    if (player.board[location].isHit || player.board[location].isMiss) {
      return randomAttackLocation(player, 100);
    }

    return location;
  };

  const aiAttackLogic = (
    opponent: gameBoardInterface,
    square?: number,
  ): [number, gameBoardInterface] => {
    let attackLocation: number;
    let updatedOpponentBoard: gameBoardInterface;

    if (square) {
      // location pre determined (for testing)
      attackLocation = square;

      // attacks location and returns updated opponent object
      updatedOpponentBoard = newAttackSystem.logic(attackLocation, opponent);

      // check to see if there was a hit to trigger targeted attacks
      newTargetingSystem.attackLogic(updatedOpponentBoard, attackLocation);
    } else if (newTargetingSystem.props.hitShips.size > 0) {
      // there is at least one ship that is hit

      // gets location to attack
      attackLocation = newTargetingSystem.attackLogic(opponent);

      // attacks and assigns updated opponent object to var
      updatedOpponentBoard = newAttackSystem.logic(attackLocation, opponent);

      if (updatedOpponentBoard.board[attackLocation].ship?.props.sunk) {
        newTargetingSystem.props.hitShips.delete(
          updatedOpponentBoard.board[attackLocation].ship!,
        );
        newTargetingSystem.resetProperties();
      } else if (
        updatedOpponentBoard.board[attackLocation].isHit &&
        newTargetingSystem.props.hitShips.size > 0
      ) {
        if (newTargetingSystem.props.useSecondInitialHit) {
          const newNumber =
            updatedOpponentBoard.board[attackLocation].ship!.props
              .hitLocations[0];
          newTargetingSystem.props.secondInitialHit = newNumber;
        }

        newTargetingSystem.setAttackOrientation(attackLocation);
        const squares = newTargetingSystem.getSquares(
          attackLocation,
          updatedOpponentBoard,
        );

        squares.forEach((square) => {
          newTargetingSystem.props.possibleAttacks.add(square);
        });

        const attackPath = newTargetingSystem.getAttackPath(attackLocation);
        newTargetingSystem.props.possibleAttacks = attackPath;
        newTargetingSystem.props.hitShips.add(
          updatedOpponentBoard.board[attackLocation].ship!,
        );
      }
    } else {
      // attack a random location

      // get random location to attack
      attackLocation = randomAttackLocation(opponent, 100);

      // attacks location and assigns updated opponent object to var
      updatedOpponentBoard = newAttackSystem.logic(attackLocation, opponent);

      if (
        updatedOpponentBoard.board[attackLocation].isHit &&
        newTargetingSystem.props.hitShips.size === 0
      ) {
        const squares = newTargetingSystem.getSquares(
          attackLocation,
          updatedOpponentBoard,
        );

        newTargetingSystem.props.possibleAttacks = squares;
        newTargetingSystem.props.hitShips.add(
          updatedOpponentBoard.board[attackLocation].ship!,
        );
        newTargetingSystem.props.initialHitSquare = attackLocation;
      }
    }

    if (newTargetingSystem.props.possibleAttacks.size > 0) {
      newTargetingSystem.removeAdjacentSquare(attackLocation);
    }

    return [attackLocation, updatedOpponentBoard];
  };
  return {
    randomAttackLocation,
    aiAttackLogic,
  };
}
