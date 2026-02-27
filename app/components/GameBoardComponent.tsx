import { GameBoardButton } from './GameBoardButton';
import type { gameBoardInterface } from '~/utils/gameBoard';

interface GameBoardComponentProps {
  board: gameBoardInterface;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
  handleOnClick: (id: number) => void;
  label: string;
  dblClick: () => void;
}

export function GameBoardComponent({
  board,
  handleOnClick,
  handleMouseEnter,
  handleMouseLeave,
  label,
  dblClick,
}: GameBoardComponentProps) {
  return (
    <section role='region' aria-label={label}>
      {board.board.map((square) => (
        <GameBoardButton
          key={square.id}
          testId={square.id.toString()}
          board={board}
          handleOnClick={handleOnClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          dblClick={dblClick}
        />
      ))}
    </section>
  );
}
