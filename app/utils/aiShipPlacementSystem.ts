import type { gameBoardInterface } from './GameBoard';
import shipPlacementSystem from './shipPlacementSystem';

export interface aiShipPlacementSystemInterface {
  randomSquare: (max: number, testNumber?: number) => number;
  placeShipOnGameBoard: () => gameBoardInterface;
}

export default function aiShipPlacementSystem(ai: gameBoardInterface) {
  const randomSquare = (max: number, testNumber?: number): number => {
    let square;

    if (testNumber) {
      square = testNumber;
    } else {
      square = Math.floor(Math.random() * max);
    }

    if (ai.props.selectedShip) {
      const shipPlacementLogic = shipPlacementSystem(ai);
      const shipPaths = shipPlacementLogic.getShipPaths(
        ai.props.selectedShip.props.length,
        square,
      );
      if (
        shipPlacementLogic.isAvailableSquare(square) &&
        shipPaths.length !== 0
      ) {
        return square;
      }
    }

    return randomSquare(max);
  };
  const placeShipOnGameBoard = (): gameBoardInterface => {
    const shipPlacementLogic = shipPlacementSystem(ai);

    ai.props.allShips.forEach((ship) => {
      ai.props.selectedShip = ship;

      const square = randomSquare(100);
      ship.addShipStart(square);

      const shipPaths = shipPlacementLogic.getShipPaths(
        ship.props.length,
        square,
      );

      const chosenPath =
        shipPaths[Math.floor(Math.random() * shipPaths.length)];

      const endPoint = chosenPath.array[chosenPath.array.length - 1];
      ship.addShipEndPoint(endPoint);

      chosenPath.array.forEach((location) => {
        ai.board[location].ship = ship;
      });

      ship.props.isPlaced = true;

      if (shipPlacementLogic.areAllShipsPlaced(ai.props.allShips) === true) {
        ai.props.allShipsPlaced = true;
      }
    });

    return ai;
  };

  return {
    randomSquare,
    placeShipOnGameBoard,
  };
}
