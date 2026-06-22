import type { gameBoardInterface } from './gameBoard';
import type { shipInterface } from './ship';
import shipPlacementSystem from './shipPlacementSystem';

export interface targetingSystemInterface {
  props: {
    possibleAttacks: Set<number>;
    initialHitSquare: number;
    attackOrientation: string;
    hitShips: Set<shipInterface>;
    secondInitialHit: number;
    useSecondInitialHit: boolean;
  };
  isOpponentSquareAvailable: (
    square: number,
    opponent: gameBoardInterface,
  ) => boolean;
  isAvailableSquare: (square: number, opponent: gameBoardInterface) => boolean;
  getSquares: (square: number, opponent: gameBoardInterface) => Set<number>;
  removeAdjacentSquare: (square: number) => void;
  setAttackOrientation: (square: number) => void;
  isRowAttack: (square: number, adjacentSquare: number) => boolean;
  isColAttack: (square: number, adjacentSquare: number) => boolean;
  getAttackPath: (square: number) => Set<number>;
  resetProperties: () => void;
  getMorePossibleAttacks: (opponent: gameBoardInterface) => Set<number>;
  attackLogic: (opponent: gameBoardInterface, testNumber?: number) => number;
}

export default function targetingSystem() {
  const newShipPlacementSystem = shipPlacementSystem();

  const props: targetingSystemInterface['props'] = {
    possibleAttacks: new Set<number>(),
    initialHitSquare: 0,
    attackOrientation: 'none',
    hitShips: new Set<shipInterface>(),
    secondInitialHit: 0,
    useSecondInitialHit: false,
  };
  const isOpponentSquareAvailable = (
    square: number,
    opponent: gameBoardInterface,
  ): boolean => {
    if (opponent.board[square].isHit) {
      return false;
    } else {
      return true;
    }
  };
  const isAvailableSquare = (
    square: number,
    opponent: gameBoardInterface,
  ): boolean => {
    return !opponent.board[square].isHit && !opponent.board[square].isMiss;
  };

  const getSquares = (
    square: number,
    opponent: gameBoardInterface,
  ): Set<number> => {
    const availableSquares: Set<number> = new Set();
    const squares = newShipPlacementSystem.possibleShipEndPoints(
      square,
      2,
      opponent,
    );
    squares.forEach((s) => {
      const available = isOpponentSquareAvailable(s, opponent);
      if (available) {
        availableSquares.add(s);
      }
    });

    return availableSquares;
  };

  const removeAdjacentSquare = (square: number) => {
    props.possibleAttacks.delete(square);
  };

  const setAttackOrientation = (square: number) => {
    let firstHit;
    if (props.secondInitialHit) {
      firstHit = props.secondInitialHit;
    } else firstHit = props.initialHitSquare;

    if (
      (square - firstHit!) % 10 === 0 ||
      ((firstHit! - square) * 1) % 10 === 0
    ) {
      props.attackOrientation = 'column';
    } else {
      props.attackOrientation = 'row';
    }
  };

  const isRowAttack = (square: number, adjacentSquare: number): boolean => {
    const firstExpression = Math.abs(square - adjacentSquare);
    const isFirstTrue = firstExpression / 1 === 1;
    const secondExpression = Math.abs(props.initialHitSquare! - adjacentSquare);
    const isSecondTrue = secondExpression / 1 === 1;
    return isFirstTrue || isSecondTrue;
  };

  const isColAttack = (square: number, adjacentSquare: number): boolean => {
    const firstExpression = square - adjacentSquare;
    const isFirstTrue = firstExpression % 10 === 0;
    const secondExpression = adjacentSquare - square;
    const isSecondTrue = secondExpression % 10 === 0;
    return isFirstTrue || isSecondTrue;
  };

  const getAttackPath = (square: number): Set<number> => {
    const attackPath: Set<number> = new Set();
    props.possibleAttacks.forEach((adjacentSquare) => {
      if (props.attackOrientation === 'column') {
        if (isColAttack(square, adjacentSquare)) {
          attackPath.add(adjacentSquare);
        }
      } else {
        if (isRowAttack(square, adjacentSquare)) {
          attackPath.add(adjacentSquare);
        }
      }
    });

    return attackPath;
  };

  const resetProperties = () => {
    if (props.useSecondInitialHit!) {
      props.initialHitSquare = 0;
    }
    props.possibleAttacks.clear();
    props.attackOrientation = 'none';
    props.secondInitialHit = 0;
    props.useSecondInitialHit = false;
  };

  const getMorePossibleAttacks = (
    opponent: gameBoardInterface,
  ): Set<number> => {
    const possibleAttacks: Set<number> = new Set();
    props.hitShips.forEach((ship) => {
      ship.props.hitLocations.forEach((location) => {
        const adjacentSquares = api.getSquares(location, opponent);
        adjacentSquares.forEach((square) => {
          possibleAttacks.add(square);
        });
      });
    });

    return possibleAttacks;
  };

  const attackLogic = (
    opponent: gameBoardInterface,
    testNumber?: number,
  ): number => {
    let attackLocation: number;

    if (props.hitShips.size > 0 && props.possibleAttacks.size === 0) {
      props.possibleAttacks = api.getMorePossibleAttacks(opponent);
      props.useSecondInitialHit = true;
    }

    if (testNumber) {
      attackLocation = testNumber;
    } else {
      const array = [...props.possibleAttacks];
      attackLocation = array[Math.floor(Math.random() * array.length)];
    }

    return attackLocation;
  };

  const api = {
    props,
    isOpponentSquareAvailable,
    isAvailableSquare,
    getSquares,
    removeAdjacentSquare,
    setAttackOrientation,
    isRowAttack,
    isColAttack,
    getAttackPath,
    resetProperties,
    getMorePossibleAttacks,
    attackLogic,
  };

  return api;
}
