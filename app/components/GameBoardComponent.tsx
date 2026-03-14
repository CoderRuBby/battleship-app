import { GameBoardButton } from './GameBoardButton';
import type { gameBoardInterface } from '~/utils/gameBoard';

interface GameBoardComponentProps {
  player: gameBoardInterface;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
  handleOnClick: (id: number) => void;
  label: string;
  dblClick: (id: number) => void;
}

export function GameBoardComponent({
  player,
  handleOnClick,
  handleMouseEnter,
  handleMouseLeave,
  label,
  dblClick,
}: GameBoardComponentProps) {
  return (
    <section role='region' aria-label={label}>
      {player.board.map((square) => (
        <GameBoardButton
          key={square.id}
          testId={square.id.toString()}
          player={player}
          handleOnClick={handleOnClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          dblClick={dblClick}
        />
      ))}
    </section>
  );
}
