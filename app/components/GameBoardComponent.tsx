import { GameBoardButton } from './GameBoardButton';
import type { gameBoardInterface } from '~/utils/GameBoard';

interface GameBoardComponentProps {
  playerGameBoard: gameBoardInterface;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
  handleOnClick: (id: number) => void;
  label: string;
}

export function GameBoardComponent({
  playerGameBoard,
  handleOnClick,
  handleMouseEnter,
  handleMouseLeave,
  label,
}: GameBoardComponentProps) {
  return (
    <section role='region' aria-label={label}>
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
