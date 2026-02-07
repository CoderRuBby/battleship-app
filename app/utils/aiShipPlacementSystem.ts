import type { gameBoardInterface } from './gameBoard';
import shipPlacementSystem from './shipPlacementSystem';

export interface aiShipPlacementSystemInterface {
  randomSquare: (
    max: number,
    board: gameBoardInterface,
    testNumber?: number,
  ) => number;
  placeShipOnGameBoard: (board: gameBoardInterface) => gameBoardInterface;
}

export default function aiShipPlacementSystem() {
  const randomSquare = (
    max: number,
    board: gameBoardInterface,
    testNumber?: number,
  ): number => {
    let square;

    if (testNumber) {
      square = testNumber;
    } else {
      square = Math.floor(Math.random() * max);
    }

    if (board.props.selectedShip) {
      const shipPlacementLogic = shipPlacementSystem(board);
      const shipPaths = shipPlacementLogic.getShipPaths(
        board.props.selectedShip.props.length,
        square,
      );
      if (
        shipPlacementLogic.isAvailableSquare(square) &&
        shipPaths.length !== 0
      ) {
        return square;
      }
    }

    return randomSquare(max, board);
  };
  const placeShipOnGameBoard = (
    board: gameBoardInterface,
  ): gameBoardInterface => {
    const shipPlacementLogic = shipPlacementSystem(board);

    board.props.allShips.forEach((ship) => {
      board.props.selectedShip = ship;

      const square = randomSquare(100, board);
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
        board.board[location].ship = ship;
      });

      ship.props.isPlaced = true;

      if (shipPlacementLogic.areAllShipsPlaced(board.props.allShips) === true) {
        board.props.allShipsPlaced = true;
      }
    });

    return board;
  };

  return {
    randomSquare,
    placeShipOnGameBoard,
  };
}
