import type { GameBoardType } from './GameBoard';
import type { ShipType } from './Ship';

export type ShipControllerType = {
  PlayerGameBoard: GameBoardType;
  selectShip: (ship: ShipType) => void;
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
  ) => number[];
  getShipPaths: (shipLength: number, shipStartPoint: number) => number[][];
  canPlaceShip: (square: number) => boolean;
  areAllShipsPlaced: (shipsArray: ShipType[]) => boolean;
  placeShipOnGameBoard: (
    ship: ShipType,
    shipStartPoint: number,
    shipEndPoint: number,
  ) => void;
  shipPlacementLogic: (square: number) => void;
};

export const ShipController: (
  PlayerGameBoard: GameBoardType,
) => ShipControllerType = (PlayerGameBoard) => {
  const controller: ShipControllerType = {
    PlayerGameBoard: PlayerGameBoard,
    selectShip: (ship: ShipType) => {
      if (ship === controller.PlayerGameBoard.selectedShip) {
        controller.PlayerGameBoard.selectedShip.shipStartPoint = null;
        controller.PlayerGameBoard.selectedShip = null;
      } else {
        if (controller.PlayerGameBoard.selectedShip !== null) {
          controller.PlayerGameBoard.selectedShip.shipStartPoint = null;
        }
        controller.PlayerGameBoard.selectedShip = ship;
      }
    },
    isAvailableSquare: (square: number): boolean => {
      if (controller.PlayerGameBoard.board[square].ship === null) {
        return true;
      } else {
        return false;
      }
    },
    pathIsAvailable: (path: number[]) => {
      let isAvailable = true;
      path.forEach((square) => {
        if (controller.isAvailableSquare(square) === false) {
          isAvailable = false;
        }
      });

      return isAvailable;
    },
    possibleShipEndPoints: (
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
        if (controller.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check left direction
      if (col - (shipLength - 1) >= 0) {
        endPoint = initialSquare - (shipLength - 1);
        if (controller.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check down direction
      if (row + shipLength - 1 < 10) {
        endPoint = initialSquare + (shipLength - 1) * 10;
        if (controller.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check up direction
      if (row - (shipLength - 1) >= 0) {
        endPoint = initialSquare - (shipLength - 1) * 10;
        if (controller.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      return possibleEndPoints;
    },
    possibleShipPath: (
      shipLength: number,
      shipStartPoint: number,
      shipEndPoint: number,
    ): number[] => {
      const shipPath: number[] = [];

      if (shipEndPoint - shipStartPoint === (shipLength - 1) * 10) {
        for (let i = shipStartPoint; i <= shipEndPoint; i += 10) {
          shipPath.push(i);
        }
      } else if (shipStartPoint - shipEndPoint === (shipLength - 1) * 10) {
        for (let i = shipEndPoint; i <= shipStartPoint; i += 10) {
          shipPath.push(i);
        }
      } else if (shipStartPoint - shipEndPoint === shipLength - 1) {
        for (let i = shipEndPoint; i <= shipStartPoint; i += 1) {
          shipPath.push(i);
        }
      } else if (shipEndPoint - shipStartPoint === shipLength - 1) {
        for (let i = shipStartPoint; i <= shipEndPoint; i += 1) {
          shipPath.push(i);
        }
      }

      if (controller.pathIsAvailable(shipPath) === false) return [];

      return shipPath;
    },
    getShipPaths: (shipLength: number, shipStartPoint: number): number[][] => {
      const shipPaths: number[][] = [];

      const shipEndPoints = controller.possibleShipEndPoints(
        shipStartPoint,
        shipLength,
      );

      shipEndPoints.forEach((endPoint) => {
        const path = controller.possibleShipPath(
          shipLength,
          shipStartPoint,
          endPoint,
        );
        if (path.length !== 0) {
          shipPaths.push(path);
        }
      });

      return shipPaths;
    },
    canPlaceShip: (square: number): boolean => {
      let canPlace = true;
      if (
        controller.PlayerGameBoard.selectedShip !== null &&
        controller.PlayerGameBoard.selectedShip.shipStartPoint !== null
      ) {
        const shipPath = controller.possibleShipPath(
          controller.PlayerGameBoard.selectedShip.length,
          controller.PlayerGameBoard.selectedShip.shipStartPoint,
          square,
        );
        shipPath.forEach((path) => {
          if (controller.PlayerGameBoard.board[path].ship !== null) {
            canPlace = false;
          }
        });
      } else {
        canPlace = false;
      }

      return canPlace;
    },

    areAllShipsPlaced: (shipsArray: ShipType[]) => {
      let placed = true;
      shipsArray.forEach((ship) => {
        if (ship.isPlaced === false) {
          placed = false;
        }
      });
      return placed;
    },

    placeShipOnGameBoard: (
      ship: ShipType,
      shipStartPoint: number,
      shipEndPoint: number,
    ) => {
      const path = controller.possibleShipPath(
        ship.length,
        shipStartPoint,
        shipEndPoint,
      );
      path.forEach((location) => {
        controller.PlayerGameBoard.board[location].ship = ship;
      });

      ship.isPlaced = true;

      if (
        controller.areAllShipsPlaced(controller.PlayerGameBoard.allShips) ===
        true
      ) {
        controller.PlayerGameBoard.allShipsPlaced = true;
      }
    },

    shipPlacementLogic: (squareNumber: number) => {
      if (!controller.PlayerGameBoard.selectedShip) return;

      if (controller.PlayerGameBoard.selectedShip.shipStartPoint === null) {
        if (controller.isAvailableSquare(squareNumber)) {
          controller.PlayerGameBoard.selectedShip.shipStartPoint = squareNumber;
        }
        return;
      }

      if (controller.canPlaceShip(squareNumber) === true) {
        controller.PlayerGameBoard.selectedShip.addShipEndPoint(squareNumber);
        controller.placeShipOnGameBoard(
          controller.PlayerGameBoard.selectedShip,
          controller.PlayerGameBoard.selectedShip.shipStartPoint,
          squareNumber,
        );
        controller.PlayerGameBoard.selectedShip = null;
      }
    },
  };

  return controller;
};
