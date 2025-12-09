import type { gameBoardInterface } from './GameBoard';
import shipPlacementSystem from './shipPlacementSystem';

export interface aiShipPlacementSystemInterface {
  randomSquare: (max: number, testNumber?: number) => number;
  placeShipOnGameBoard: () => void;
}

export default function aiShipPlacementSystem(ai: gameBoardInterface) {
  return {
    randomSquare: function (max: number, testNumber?: number): number {
      let square;

      if (testNumber) {
        square = testNumber;
      } else {
        square = Math.floor(Math.random() * max);
      }

      if (ai.selectedShip) {
        const shipPlacementLogic = shipPlacementSystem(ai);
        const shipPaths = shipPlacementLogic.getShipPaths(
          ai.selectedShip.length,
          square,
        );
        if (
          shipPlacementLogic.isAvailableSquare(square) &&
          shipPaths.length !== 0
        ) {
          return square;
        }
      }

      return this.randomSquare(max);
    },
    placeShipOnGameBoard: function () {
      const shipPlacementLogic = shipPlacementSystem(ai);

      ai.allShips.forEach((ship) => {
        ai.selectedShip = ship;

        const square = this.randomSquare(100);
        ship.addShipStart(square);

        const shipPaths = shipPlacementLogic.getShipPaths(ship.length, square);

        const chosenPath =
          shipPaths[Math.floor(Math.random() * shipPaths.length)];

        const endPoint = chosenPath.array[chosenPath.array.length - 1];
        ship.addShipEndPoint(endPoint);

        chosenPath.array.forEach((location) => {
          ai.board[location].ship = ship;
        });

        ship.isPlaced = true;

        if (shipPlacementLogic.areAllShipsPlaced(ai.allShips) === true) {
          ai.allShipsPlaced = true;
        }
      });
    },
  };
}
