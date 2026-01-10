import type { shipInterface } from '~/utils/Ship';
import { ShipButtonComponent } from './ShipButtonComponent';
import { GameBoardComponent } from './GameBoardComponent';
import { useState } from 'react';
import shipPlacementSystem from '~/utils/shipPlacementSystem';
import type { gameBoardInterface } from '~/utils/GameBoard';
import aiShipPlacementSystem from '~/utils/aiShipPlacementSystem';
import attack from '~/utils/Attack';

export interface appComponentProps {
  allShips: shipInterface[];
  gameBoard: gameBoardInterface;
  ai: gameBoardInterface;
}

export function AppComponent({ allShips, gameBoard, ai }: appComponentProps) {
  const [playerGameBoard, setPlayerGameBoard] =
    useState<gameBoardInterface>(gameBoard);
  const [aiGameBoard, setAiGameBoard] = useState<gameBoardInterface>(ai);

  const { selectShip, getShipPaths, shipPlacementLogic } =
    shipPlacementSystem(playerGameBoard);

  const { placeShipOnGameBoard } = aiShipPlacementSystem(aiGameBoard);

  const { logic } = attack();

  const handleSelectShip = (shipName: shipInterface) => {
    const newBoard = { ...playerGameBoard };
    newBoard.selectedShip = selectShip(shipName, playerGameBoard.selectedShip);
    setPlayerGameBoard(newBoard);
  };

  const gameBoardOnClick = (id: number) => {
    if (playerGameBoard.allShipsPlaced === false) {
      const newBoard = {
        ...shipPlacementLogic(id),
      };
      setPlayerGameBoard(newBoard);
    }

    if (
      playerGameBoard.allShipsPlaced === true &&
      aiGameBoard.allShipsPlaced === false
    ) {
      setAiGameBoard(placeShipOnGameBoard);
      return;
    }

    setAiGameBoard(logic(id, aiGameBoard));
  };

  const updateBoard = (
    id: number,
    square: number,
    index: number,
    direction: string,
  ) => {
    setPlayerGameBoard((prevPlayerGameBoard) => {
      //! refactor: better readability
      const updatedBoard = [...prevPlayerGameBoard.board];
      if (
        updatedBoard[square]?.id !== id ||
        updatedBoard[square].ship !== null
      ) {
        updatedBoard[square] = {
          ...updatedBoard[square],
          imageNumber: index,
          imageDirection: direction,
        };
      }
      return {
        ...prevPlayerGameBoard,
        board: updatedBoard,
      };
    });
  };

  const handleMouseEnter = (id: number) => {
    if (playerGameBoard.selectedShip?.shipStartPoint !== null) {
      return;
    }

    const paths = getShipPaths(playerGameBoard.selectedShip!.length, id);
    if (paths) {
      paths.forEach((path) => {
        path.array.forEach((square, squareIndex) => {
          updateBoard(id, square, squareIndex, path.direction!);
        });
      });
    }
  };

  const handleMouseLeave = () => {
    if (
      playerGameBoard.selectedShip?.shipStartPoint !== null &&
      playerGameBoard.selectedShip?.shipEndPoint === null
    ) {
      return;
    }
    const newBoardObject = { ...playerGameBoard };
    newBoardObject.board.map((square) => {
      if (square.ship === null) {
        square.imageNumber = null;
        square.imageDirection = null;
      }
    });

    setPlayerGameBoard(newBoardObject);
  };

  return (
    <main>
      {!playerGameBoard.allShipsPlaced && (
        <ShipButtonComponent
          buttons={allShips}
          handleSelectShip={handleSelectShip}
        />
      )}
      {playerGameBoard.allShipsPlaced && (
        <GameBoardComponent
          playerGameBoard={aiGameBoard}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleOnClick={gameBoardOnClick}
          label='Ai Game Board'
        />
      )}
      <GameBoardComponent
        playerGameBoard={playerGameBoard}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleOnClick={gameBoardOnClick}
        label='The Game Board'
      />
    </main>
  );
}
