import type { gameBoardInterface } from './gameBoard';
import type { shipInterface } from './ship';

export interface shipPlacementSystemInterface {
  selectShip: (
    ship: shipInterface,
    selectedShip: shipInterface | null,
  ) => shipInterface | null;
  isAvailableSquare: (square: number, board: gameBoardInterface) => boolean;
  pathIsAvailable: (path: number[], board: gameBoardInterface) => boolean;
  possibleShipEndPoints: (
    initialSquare: number,
    shipLength: number,
    board: gameBoardInterface,
  ) => number[];
  possibleShipPath: (
    shipLength: number,
    shipStartPoint: number,
    shipEndPoint: number,
    board: gameBoardInterface,
  ) => { direction: null | string; array: number[] };
  getShipPaths: (
    shipLength: number,
    shipStartPoint: number,
    board: gameBoardInterface,
  ) => { direction: null | string; array: number[] }[];
  canPlaceShip: (
    shipLength: number,
    selectedShip: shipInterface,
    board: gameBoardInterface,
  ) => boolean;
  areAllShipsPlaced: (shipsArray: shipInterface[]) => boolean;
  placeShipOnGameBoard: (
    ship: shipInterface,
    startPoint: number,
    shipEndPoint: number,
    board: gameBoardInterface,
  ) => gameBoardInterface;
  //! rename to logic
  shipPlacementLogic: (
    squareNumber: number,
    board: gameBoardInterface,
  ) => gameBoardInterface;
}

export default function shipPlacementSystem(): shipPlacementSystemInterface {
  const selectShip = (
    ship: shipInterface,
    selectedShip: shipInterface | null,
  ): shipInterface | null => {
    if (ship === selectedShip) {
      selectedShip.props.shipStartPoint = null;
      return null;
    } else {
      if (selectedShip !== null) {
        selectedShip.props.shipStartPoint = null;
      }
      return ship;
    }
  };

  const isAvailableSquare = (
    square: number,
    board: gameBoardInterface,
  ): boolean => {
    if (board.board[square].ship === null) {
      return true;
    } else {
      return false;
    }
  };

  const pathIsAvailable = (
    path: number[],
    board: gameBoardInterface,
  ): boolean => {
    let isAvailable = true;
    path.forEach((square) => {
      if (isAvailableSquare(square, board) === false) {
        isAvailable = false;
      }
    });

    return isAvailable;
  };

  const possibleShipEndPoints = (
    initialSquare: number,
    shipLength: number,
    board: gameBoardInterface,
  ): number[] => {
    const possibleEndPoints: number[] = [];
    const row = Math.floor(initialSquare / 10);
    const col = initialSquare % 10;
    let endPoint: number;

    // Check right direction
    if (col + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1);
      if (isAvailableSquare(endPoint, board) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check left direction
    if (col - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1);
      if (isAvailableSquare(endPoint, board) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check down direction
    if (row + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1) * 10;
      if (isAvailableSquare(endPoint, board) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check up direction
    if (row - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1) * 10;
      if (isAvailableSquare(endPoint, board) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    return possibleEndPoints;
  };

  const possibleShipPath = (
    shipLength: number,
    shipStartPoint: number,
    shipEndPoint: number,
    board: gameBoardInterface,
  ): { direction: null | string; array: number[] } => {
    const shipPath: { direction: null | string; array: number[] } = {
      direction: null,
      array: [],
    };

    if (shipEndPoint - shipStartPoint === (shipLength - 1) * 10) {
      for (let i = shipStartPoint; i <= shipEndPoint; i += 10) {
        shipPath.array.push(i);
        shipPath.direction = 'down';
      }
    } else if (shipStartPoint - shipEndPoint === (shipLength - 1) * 10) {
      for (let i = shipEndPoint; i <= shipStartPoint; i += 10) {
        shipPath.array.push(i);
        shipPath.direction = 'up';
      }
    } else if (shipStartPoint - shipEndPoint === shipLength - 1) {
      for (let i = shipEndPoint; i <= shipStartPoint; i += 1) {
        shipPath.array.push(i);
        shipPath.direction = 'left';
      }
    } else if (shipEndPoint - shipStartPoint === shipLength - 1) {
      for (let i = shipStartPoint; i <= shipEndPoint; i += 1) {
        shipPath.array.push(i);
        shipPath.direction = 'right';
      }
    }

    if (pathIsAvailable(shipPath.array, board) === false)
      return {
        direction: null,
        array: [],
      };

    return shipPath;
  };

  const getShipPaths = (
    shipLength: number,
    shipStartPoint: number,
    board: gameBoardInterface,
  ): { direction: null | string; array: number[] }[] => {
    const shipPaths: { direction: null | string; array: number[] }[] = [];

    const shipEndPoints = possibleShipEndPoints(
      shipStartPoint,
      shipLength,
      board,
    );

    shipEndPoints.forEach((endPoint) => {
      const path = possibleShipPath(
        shipLength,
        shipStartPoint,
        endPoint,
        board,
      );
      if (path.array.length !== 0) {
        shipPaths.push(path);
      }
    });

    return shipPaths;
  };

  const canPlaceShip = (
    square: number,
    selectedShip: shipInterface,
    board: gameBoardInterface,
  ): boolean => {
    let canPlace = true;
    if (selectedShip !== null && selectedShip.props.shipStartPoint !== null) {
      const shipPath = possibleShipPath(
        selectedShip.props.length,
        selectedShip.props.shipStartPoint,
        square,
        board,
      );
      shipPath.array.forEach((square) => {
        if (board.board[square].ship !== null) {
          canPlace = false;
        }
      });
    } else {
      canPlace = false;
    }

    return canPlace;
  };

  const areAllShipsPlaced = (shipsArray: shipInterface[]) => {
    let placed = true;
    shipsArray.forEach((ship) => {
      if (ship.props.isPlaced === false) {
        placed = false;
      }
    });
    return placed;
  };

  const placeShipOnGameBoard = (
    ship: shipInterface,
    shipStartPoint: number,
    shipEndPoint: number,
    board: gameBoardInterface,
  ): gameBoardInterface => {
    const path = possibleShipPath(
      ship.props.length,
      shipStartPoint,
      shipEndPoint,
      board,
    );
    ship.props.placedLocations = path.array;
    path.array.forEach((location, index) => {
      board.board[location].ship = ship;
      board.board[location].imageNumber = index;
      board.board[location].imageDirection = path.direction;
    });

    ship.props.isPlaced = true;

    if (areAllShipsPlaced(board.props.allShips) === true) {
      board.props.allShipsPlaced = true;
    }

    return board;
  };

  const shipPlacementLogic = (
    squareNumber: number,
    board: gameBoardInterface,
  ): gameBoardInterface => {
    if (board.props.selectedShip === null) return board;

    if (board.props.selectedShip.props.shipStartPoint === null) {
      if (isAvailableSquare(squareNumber, board)) {
        board.props.selectedShip.props.shipStartPoint = squareNumber;
      }
      return board;
    }

    if (canPlaceShip(squareNumber, board.props.selectedShip, board) === true) {
      board.props.selectedShip.addShipEndPoint(squareNumber);
      placeShipOnGameBoard(
        board.props.selectedShip,
        board.props.selectedShip.props.shipStartPoint,
        squareNumber,
        board,
      );

      board.props.selectedShip = null;
    }
    return board;
  };

  return {
    selectShip,
    isAvailableSquare,
    pathIsAvailable,
    possibleShipEndPoints,
    possibleShipPath,
    getShipPaths,
    canPlaceShip,
    areAllShipsPlaced,
    placeShipOnGameBoard,
    shipPlacementLogic,
  };
}
