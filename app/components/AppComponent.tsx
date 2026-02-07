import type { shipInterface } from '~/utils/Ship';
import { ShipButtonComponent } from './ShipButtonComponent';
import { GameBoardComponent } from './GameBoardComponent';
import { useState } from 'react';
import shipPlacementSystem from '~/utils/shipPlacementSystem';
import type { gameBoardInterface } from '~/utils/GameBoard';
import aiShipPlacementSystem from '~/utils/aiShipPlacementSystem';
import attack from '~/utils/Attack';
import aiAttack from '~/utils/aiAttack';

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

  const { aiAttackLogic } = aiAttack();

  const handleSelectShip = (shipName: shipInterface) => {
    const newBoard = { ...playerGameBoard };
    newBoard.props.selectedShip = selectShip(
      shipName,
      playerGameBoard.props.selectedShip,
    );
    setPlayerGameBoard(newBoard);
  };

  const gameBoardOnClick = (id: number) => {
    if (playerGameBoard.props.allShipsPlaced === false) {
      const newBoard = {
        ...shipPlacementLogic(id),
      };
      setPlayerGameBoard(newBoard);
    }

    if (
      playerGameBoard.props.allShipsPlaced === true &&
      aiGameBoard.props.allShipsPlaced === false
    ) {
      setAiGameBoard(placeShipOnGameBoard);
    }
  };

  const aiGameBoardOnClick = (id: number) => {
    // player attacks, setting opponents board
    setAiGameBoard(logic(id, aiGameBoard));

    // ai attacks setting the players board
    const [num, obj] = aiAttackLogic(playerGameBoard, id);

    setPlayerGameBoard(obj);
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
    if (playerGameBoard.props.selectedShip?.props.shipStartPoint !== null) {
      return;
    }

    const paths = getShipPaths(
      playerGameBoard.props.selectedShip!.props.length,
      id,
    );
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
      playerGameBoard.props.selectedShip?.props.shipStartPoint !== null &&
      playerGameBoard.props.selectedShip?.props.shipEndPoint === null
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
      {!playerGameBoard.props.allShipsPlaced && (
        <ShipButtonComponent
          buttons={allShips}
          handleSelectShip={handleSelectShip}
        />
      )}
      {playerGameBoard.props.allShipsPlaced && (
        <GameBoardComponent
          board={aiGameBoard}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleOnClick={aiGameBoardOnClick}
          label='Ai Game Board'
        />
      )}
      <GameBoardComponent
        board={playerGameBoard}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleOnClick={gameBoardOnClick}
        label='The Game Board'
      />
    </main>
  );
}
