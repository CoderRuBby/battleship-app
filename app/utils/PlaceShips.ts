import type { gameBoardInterface } from './GameBoard';
import type { shipInterface } from './Ship';

export interface shipPlacementSystemInterface {
  playerGameBoard: gameBoardInterface;
  selectShip: (ship: shipInterface) => void;
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
  canPlaceShip: (shipLength: number) => boolean;
  areAllShipsPlaced: (shipsArray: shipInterface[]) => boolean;
  placeShipOnGameBoard: (
    ship: shipInterface,
    startPoint: number,
    shipEndPoint: number,
  ) => void;
  shipPlacementLogic: (squareNumber: number) => void;
}

export default function shipPlacementSystem(
  playerGameBoard: gameBoardInterface,
): shipPlacementSystemInterface {
  return {
    playerGameBoard: playerGameBoard,
    selectShip: function (ship: shipInterface) {
      if (ship === this.playerGameBoard.selectedShip) {
        this.playerGameBoard.selectedShip.shipStartPoint = null;
        this.playerGameBoard.selectedShip = null;
      } else {
        if (this.playerGameBoard.selectedShip !== null) {
          this.playerGameBoard.selectedShip.shipStartPoint = null;
        }
        this.playerGameBoard.selectedShip = ship;
      }
    },

    isAvailableSquare: function (square: number): boolean {
      if (this.playerGameBoard.board[square].ship === null) {
        return true;
      } else {
        return false;
      }
    },

    pathIsAvailable: function (path: number[]): boolean {
      let isAvailable = true;
      path.forEach((square) => {
        if (this.isAvailableSquare(square) === false) {
          isAvailable = false;
        }
      });

      return isAvailable;
    },

    possibleShipEndPoints(initialSquare: number, shipLength: number): number[] {
      const possibleEndPoints: number[] = [];
      const row = Math.floor(initialSquare / 10);
      const col = initialSquare % 10;
      let endPoint: number;

      // Check right direction
      if (col + shipLength - 1 < 10) {
        endPoint = initialSquare + (shipLength - 1);
        if (this.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check left direction
      if (col - (shipLength - 1) >= 0) {
        endPoint = initialSquare - (shipLength - 1);
        if (this.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check down direction
      if (row + shipLength - 1 < 10) {
        endPoint = initialSquare + (shipLength - 1) * 10;
        if (this.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      // Check up direction
      if (row - (shipLength - 1) >= 0) {
        endPoint = initialSquare - (shipLength - 1) * 10;
        if (this.isAvailableSquare(endPoint) === true) {
          possibleEndPoints.push(endPoint);
        }
      }

      return possibleEndPoints;
    },

    possibleShipPath(
      shipLength: number,
      shipStartPoint: number,
      shipEndPoint: number,
    ): number[] {
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

      if (this.pathIsAvailable(shipPath) === false) return [];

      return shipPath;
    },

    getShipPaths(shipLength: number, shipStartPoint: number): number[][] {
      const shipPaths: number[][] = [];

      const shipEndPoints = this.possibleShipEndPoints(
        shipStartPoint,
        shipLength,
      );

      shipEndPoints.forEach((endPoint) => {
        const path = this.possibleShipPath(
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

    canPlaceShip(square: number): boolean {
      let canPlace = true;
      if (
        this.playerGameBoard.selectedShip !== null &&
        this.playerGameBoard.selectedShip.shipStartPoint !== null
      ) {
        const shipPath = this.possibleShipPath(
          this.playerGameBoard.selectedShip.length,
          this.playerGameBoard.selectedShip.shipStartPoint,
          square,
        );
        shipPath.forEach((path) => {
          if (this.playerGameBoard.board[path].ship !== null) {
            canPlace = false;
          }
        });
      } else {
        canPlace = false;
      }

      return canPlace;
    },

    areAllShipsPlaced(shipsArray: shipInterface[]) {
      let placed = true;
      shipsArray.forEach((ship) => {
        if (ship.isPlaced === false) {
          placed = false;
        }
      });
      return placed;
    },

    placeShipOnGameBoard(
      ship: shipInterface,
      shipStartPoint: number,
      shipEndPoint: number,
    ) {
      const path = this.possibleShipPath(
        ship.length,
        shipStartPoint,
        shipEndPoint,
      );
      path.forEach((location) => {
        this.playerGameBoard.board[location].ship = ship;
      });

      ship.isPlaced = true;

      if (this.areAllShipsPlaced(this.playerGameBoard.allShips) === true) {
        this.playerGameBoard.allShipsPlaced = true;
      }
    },

    shipPlacementLogic(squareNumber: number) {
      if (!this.playerGameBoard.selectedShip) return;

      if (this.playerGameBoard.selectedShip.shipStartPoint === null) {
        if (this.isAvailableSquare(squareNumber)) {
          this.playerGameBoard.selectedShip.shipStartPoint = squareNumber;
        }
        return;
      }

      if (this.canPlaceShip(squareNumber) === true) {
        this.playerGameBoard.selectedShip.addShipEndPoint(squareNumber);
        this.placeShipOnGameBoard(
          this.playerGameBoard.selectedShip,
          this.playerGameBoard.selectedShip.shipStartPoint,
          squareNumber,
        );
        this.playerGameBoard.selectedShip = null;
      }
    },
  };
}
