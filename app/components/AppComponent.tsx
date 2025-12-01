import type { shipInterface } from '~/utils/Ship';
import { ShipButtonComponent } from './ShipButtonComponent';
import { GameBoardComponent } from './GameBoardComponent';
import { useState } from 'react';
import useShipPlacementSystem from '~/utils/useShipPlacementSystem';
import type { gameBoardInterface } from '~/utils/GameBoard';

export interface appComponentProps {
  allShips: shipInterface[];
  gameBoard: gameBoardInterface;
}

export function AppComponent({ allShips, gameBoard }: appComponentProps) {
  const [playerGameBoard, setPlayerGameBoard] =
    useState<gameBoardInterface>(gameBoard);
  const [selectedShip, setSelectedShip] = useState<shipInterface | null>(null);

  const { selectShip, shipPlacementLogic, getShipPaths } =
    useShipPlacementSystem(playerGameBoard);

  const handleSelectShip = (shipName: shipInterface) => {
    setSelectedShip(selectShip(shipName, selectedShip));
  };

  const updateBoard = (
    id: number,
    square: number,
    index: number,
    direction: string,
  ) => {
    setPlayerGameBoard((prevPlayerGameBoard) => {
      const updatedBoard = [...prevPlayerGameBoard.board];
      if (updatedBoard[square]?.id !== id) {
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
    if (selectedShip?.shipStartPoint) {
      return;
    }

    const paths = getShipPaths(selectedShip!.length, id);
    if (paths) {
      paths.forEach((path) => {
        path.array.forEach((square, squareIndex) => {
          updateBoard(id, square, squareIndex, path.direction!);
        });
      });
    }
  };

  const handleMouseLeave = () => {
    if (selectedShip!.shipStartPoint) {
      return;
    }

    setPlayerGameBoard((prev) => {
      const newBoard = prev.board.map((square) => {
        return {
          ...square,
          imageNumber: null,
          imageDirection: null,
        };
      });
      return {
        ...prev,
        board: newBoard,
      };
    });
  };

  return (
    <main>
      <ShipButtonComponent
        buttons={allShips}
        handleSelectShip={handleSelectShip}
      />
      <GameBoardComponent
        selectedShip={selectedShip}
        playerGameBoard={playerGameBoard}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </main>
  );
}
