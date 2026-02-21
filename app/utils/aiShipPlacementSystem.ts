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
      const shipPlacementLogic = shipPlacementSystem();
      const shipPaths = shipPlacementLogic.getShipPaths(
        board.props.selectedShip.props.length,
        square,
        board,
      );
      if (
        shipPlacementLogic.isAvailableSquare(square, board) &&
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
    const shipPlacementLogic = shipPlacementSystem();

    board.props.allShips.forEach((ship) => {
      if (ship.props.isPlaced === false) {
        board.props.selectedShip = ship;

        const square = randomSquare(100, board);
        ship.addShipStart(square);

        const shipPaths = shipPlacementLogic.getShipPaths(
          ship.props.length,
          square,
          board,
        );

        const chosenPath =
          shipPaths[Math.floor(Math.random() * shipPaths.length)];

        const endPointRight = chosenPath.array[chosenPath.array.length - 1];
        const endPointLeft = chosenPath.array[0];
        if (endPointLeft === square) {
          ship.addShipEndPoint(endPointRight);
        } else {
          ship.addShipEndPoint(endPointLeft);
        }

        chosenPath.array.forEach((location, index) => {
          ship.props.placedLocations.push(location);
          board.board[location].ship = ship;
          board.board[location].imageDirection = chosenPath.direction;
          board.board[location].imageNumber = index;
        });

        ship.props.isPlaced = true;

        if (
          shipPlacementLogic.areAllShipsPlaced(board.props.allShips) === true
        ) {
          board.props.allShipsPlaced = true;
        }
      }
    });

    return board;
  };

  return {
    randomSquare,
    placeShipOnGameBoard,
  };
}
