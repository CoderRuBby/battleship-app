import type { shipInterface } from '~/utils/Ship';
import { GameBoardButton } from './GameBoardButton';

interface GameBoardComponentProps {
  selectedShip: shipInterface | null;
  gameBoard: { board: { isHit: boolean; isMiss: boolean }[] };
}

export function GameBoardComponent({
  gameBoard,
  selectedShip,
}: GameBoardComponentProps) {
  return (
    <section role='region' aria-label='The Game Board'>
      {gameBoard.board.map((square, index) => (
        <GameBoardButton
          key={index}
          testId={index.toString()}
          selectedShip={selectedShip}
          shipImageNumber={null}
          isHit={square.isHit}
          isMiss={square.isMiss}
        />
      ))}
    </section>
  );
}
