import type { gameBoardInterface } from './GameBoard';
import type { shipInterface } from './Ship';

export interface shipPlacementSystemInterface {
  selectShip: (
    ship: shipInterface,
    selectedShip: shipInterface | null,
  ) => shipInterface | null;
  isAvailableSquare: (square: number) => boolean;
  pathIsAvailable: (path: number[]) => boolean;
  possibleShipEndPoints: (
    initialSquare: number,
    shipLength: number,
  ) => number[];
  possibleShipPath: (
    shipLength: number,
    shipStartPoint: number,
    shipEndPoint: number,
  ) => { direction: null | string; array: number[] };
  getShipPaths: (
    shipLength: number,
    shipStartPoint: number,
  ) => { direction: null | string; array: number[] }[];
  canPlaceShip: (shipLength: number, selectedShip: shipInterface) => boolean;
  areAllShipsPlaced: (shipsArray: shipInterface[]) => boolean;
  placeShipOnGameBoard: (
    ship: shipInterface,
    startPoint: number,
    shipEndPoint: number,
  ) => gameBoardInterface;
  //! rename to logic
  shipPlacementLogic: (squareNumber: number) => gameBoardInterface;
}

export default function shipPlacementSystem(
  playerGameBoard: gameBoardInterface,
): shipPlacementSystemInterface {
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

  const isAvailableSquare = (square: number): boolean => {
    if (playerGameBoard.board[square].ship === null) {
      return true;
    } else {
      return false;
    }
  };

  const pathIsAvailable = (path: number[]): boolean => {
    let isAvailable = true;
    path.forEach((square) => {
      if (isAvailableSquare(square) === false) {
        isAvailable = false;
      }
    });

    return isAvailable;
  };

  const possibleShipEndPoints = (
    initialSquare: number,
    shipLength: number,
  ): number[] => {
    const possibleEndPoints: number[] = [];
    const row = Math.floor(initialSquare / 10);
    const col = initialSquare % 10;
    let endPoint: number;

    // Check right direction
    if (col + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1);
      if (isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check left direction
    if (col - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1);
      if (isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check down direction
    if (row + shipLength - 1 < 10) {
      endPoint = initialSquare + (shipLength - 1) * 10;
      if (isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    // Check up direction
    if (row - (shipLength - 1) >= 0) {
      endPoint = initialSquare - (shipLength - 1) * 10;
      if (isAvailableSquare(endPoint) === true) {
        possibleEndPoints.push(endPoint);
      }
    }

    return possibleEndPoints;
  };

  const possibleShipPath = (
    shipLength: number,
    shipStartPoint: number,
    shipEndPoint: number,
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

    if (pathIsAvailable(shipPath.array) === false)
      return {
        direction: null,
        array: [],
      };

    return shipPath;
  };

  const getShipPaths = (
    shipLength: number,
    shipStartPoint: number,
  ): { direction: null | string; array: number[] }[] => {
    const shipPaths: { direction: null | string; array: number[] }[] = [];

    const shipEndPoints = possibleShipEndPoints(shipStartPoint, shipLength);

    shipEndPoints.forEach((endPoint) => {
      const path = possibleShipPath(shipLength, shipStartPoint, endPoint);
      if (path.array.length !== 0) {
        shipPaths.push(path);
      }
    });

    return shipPaths;
  };

  const canPlaceShip = (
    square: number,
    selectedShip: shipInterface,
  ): boolean => {
    let canPlace = true;
    if (selectedShip !== null && selectedShip.props.shipStartPoint !== null) {
      const shipPath = possibleShipPath(
        selectedShip.props.length,
        selectedShip.props.shipStartPoint,
        square,
      );
      shipPath.array.forEach((square) => {
        if (playerGameBoard.board[square].ship !== null) {
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
  ): gameBoardInterface => {
    const path = possibleShipPath(
      ship.props.length,
      shipStartPoint,
      shipEndPoint,
    );
    ship.props.placedLocations = path.array;
    path.array.forEach((location, index) => {
      playerGameBoard.board[location].ship = ship;
      playerGameBoard.board[location].imageNumber = index;
      playerGameBoard.board[location].imageDirection = path.direction;
    });

    ship.props.isPlaced = true;

    if (areAllShipsPlaced(playerGameBoard.props.allShips) === true) {
      playerGameBoard.props.allShipsPlaced = true;
    }

    return playerGameBoard;
  };

  const shipPlacementLogic = (squareNumber: number): gameBoardInterface => {
    if (playerGameBoard.props.selectedShip === null) return playerGameBoard;

    if (playerGameBoard.props.selectedShip.props.shipStartPoint === null) {
      if (isAvailableSquare(squareNumber)) {
        playerGameBoard.props.selectedShip.props.shipStartPoint = squareNumber;
      }
      return playerGameBoard;
    }

    if (
      canPlaceShip(squareNumber, playerGameBoard.props.selectedShip) === true
    ) {
      playerGameBoard.props.selectedShip.addShipEndPoint(squareNumber);
      placeShipOnGameBoard(
        playerGameBoard.props.selectedShip,
        playerGameBoard.props.selectedShip.props.shipStartPoint,
        squareNumber,
      );

      playerGameBoard.props.selectedShip = null;
    }
    return playerGameBoard;
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
