import { GameBoardButton } from './GameBoardButton';
import type { gameBoardInterface } from '~/utils/GameBoard';
import type { shipInterface } from '~/utils/Ship';

interface GameBoardComponentProps {
  selectedShip: shipInterface | null;
  playerGameBoard: gameBoardInterface;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
}

export function GameBoardComponent({
  selectedShip,
  playerGameBoard,
  handleMouseEnter,
  handleMouseLeave,
}: GameBoardComponentProps) {
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
