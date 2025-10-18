import { GameBoardButton } from './GameBoardButton';
import { gameBoard } from '~/utils/GameBoard';
import type { gameBoardInterface } from '~/utils/GameBoard';
import type { shipInterface } from '~/utils/Ship';
import { useState } from 'react';
import useShipPlacementSystem from '~/utils/useShipPlacementSystem';

interface GameBoardComponentProps {
  allShips: shipInterface[];
  selectedShip: shipInterface | null;
}

export function GameBoardComponent({
  allShips,
  selectedShip,
}: GameBoardComponentProps) {
  const [playerGameBoard, setPlayerGameBoard] = useState<gameBoardInterface>(
    gameBoard(allShips),
  );
  const { getShipPaths } = useShipPlacementSystem(playerGameBoard);

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
    <section role='region' aria-label='The Game Board'>
      {playerGameBoard.board.map((square, index) => (
        <GameBoardButton
          key={index}
          testId={index.toString()}
          selectedShip={selectedShip}
          shipImageNumber={square.imageNumber}
          imageDirection={square.imageDirection}
          isHit={square.isHit}
          isMiss={square.isMiss}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </section>
  );
}
