import { GameBoardButton } from './GameBoardButton';
import type { gameBoardInterface } from '~/utils/GameBoard';

interface GameBoardComponentProps {
  playerGameBoard: gameBoardInterface;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
  handleOnClick: (id: number) => void;
}

export function GameBoardComponent({
  playerGameBoard,
  handleOnClick,
  handleMouseEnter,
  handleMouseLeave,
}: GameBoardComponentProps) {
  return (
    <section role='region' aria-label='The Game Board'>
      {playerGameBoard.board.map((square, index) => (
        <GameBoardButton
          key={index}
          testId={index.toString()}
          playerGameBoard={playerGameBoard}
          shipImageNumber={square.imageNumber}
          imageDirection={square.imageDirection}
          isHit={square.isHit}
          isMiss={square.isMiss}
          handleOnClick={handleOnClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </section>
  );
}
