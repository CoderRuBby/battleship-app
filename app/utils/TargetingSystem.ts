import type { gameBoardInterface } from './gameBoard';
import type { shipInterface } from './ship';

export interface targetingSystemInterface {
  props: {
    possibleAttacks: Set<number>;
    initialHitSquare: number;
    attackOrientation: string;
    hitShips: Set<shipInterface>;
  };
  isOpponentSquareAvailable: (
    square: number,
    opponent: gameBoardInterface,
  ) => boolean;
  isAvailableSquare: (square: number, opponent: gameBoardInterface) => boolean;
  possibleShipEndPoints: (
    initialSquare: number,
    shipLength: number,
    opponent: gameBoardInterface,
  ) => number[];
  getSquares: (square: number, opponent: gameBoardInterface) => Set<number>;
  removeAdjacentSquare: (square: number) => void;
  setAttackOrientation: (square: number) => void;
  isRowAttack: (square: number, adjacentSquare: number) => boolean;
  isColAttack: (square: number, adjacentSquare: number) => boolean;
  getAttackPath: (square: number) => Set<number>;
  resetProperties: () => void;
  randomAttackLocation: (
    player: gameBoardInterface,
    max: number,
    testNumber?: number,
  ) => number;
  getMorePossibleAttacks: (opponent: gameBoardInterface) => Set<number>;
  attackLogic: (opponent: gameBoardInterface, testNumber?: number) => number;
}

export default function targetingSystem() {
  const props: targetingSystemInterface['props'] = {
    possibleAttacks: new Set<number>(),
    initialHitSquare: 0,
    attackOrientation: 'none',
    hitShips: new Set<shipInterface>(),
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
  const possibleShipEndPoints = (
    initialSquare: number,
    shipLength: number,
    opponent: gameBoardInterface,
  ): number[] => {
    const possibleEndPoints: number[] = [];
    const row = Math.floor(initialSquare / 10);
    const col = initialSquare % 10;
    let endPoint: number;

    // Check right direction
    if (col + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1);
      if (isAvailableSquare(endPoint, opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check left direction
    if (col - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1);
      if (isAvailableSquare(endPoint, opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check down direction
    if (row + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1) * 10;
      if (isAvailableSquare(endPoint, opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check up direction
    if (row - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1) * 10;
      if (isAvailableSquare(endPoint, opponent) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    return possibleEndPoints;
  };

  const getSquares = (
    square: number,
    opponent: gameBoardInterface,
  ): Set<number> => {
    const availableSquares: Set<number> = new Set();
    const squares = possibleShipEndPoints(square, 2, opponent);

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
    if (
      square - props.initialHitSquare! === 10 ||
      props.initialHitSquare! - square === 10
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
    props.possibleAttacks.clear();
    props.initialHitSquare = 0;
    props.attackOrientation = 'none';
  };

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
    }

    if (testNumber) {
      attackLocation = testNumber;
    } else if (props.hitShips.size > 0) {
      const array = [...props.possibleAttacks];
      attackLocation =
        array[api.randomAttackLocation(opponent, props.possibleAttacks.size)];
    } else {
      attackLocation = api.randomAttackLocation(opponent, 100);
    }

    if (props.possibleAttacks.size > 0) {
      api.removeAdjacentSquare(attackLocation);
    }

    if (opponent.board[attackLocation].ship?.props.sunk) {
      props.hitShips.delete(opponent.board[attackLocation].ship!);
      api.resetProperties();
      return attackLocation;
    }

    if (opponent.board[attackLocation].isHit && props.hitShips.size > 0) {
      api.setAttackOrientation(attackLocation);
      const squares = api.getSquares(attackLocation, opponent);
      squares.forEach((square) => {
        props.possibleAttacks.add(square);
      });
      const attackPath = api.getAttackPath(attackLocation);
      props.possibleAttacks = attackPath;
      props.hitShips.add(opponent.board[attackLocation].ship!);
    }

    if (opponent.board[attackLocation].isHit && props.hitShips.size === 0) {
      const squares = api.getSquares(attackLocation, opponent);
      props.possibleAttacks = squares;
      props.hitShips.add(opponent.board[attackLocation].ship!);
      props.initialHitSquare = attackLocation;
    }

    return attackLocation;
  };

  const api = {
    props,
    isOpponentSquareAvailable,
    isAvailableSquare,
    possibleShipEndPoints,
    getSquares,
    removeAdjacentSquare,
    setAttackOrientation,
    isRowAttack,
    isColAttack,
    getAttackPath,
    resetProperties,
    randomAttackLocation,
    getMorePossibleAttacks,
    attackLogic,
  };

  return api;
}
