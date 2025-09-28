import { GameBoardButton } from './GameBoardButton';

interface GameBoardComponentProps {
  gameBoard: { board: { isHit: boolean; isMiss: boolean }[] };
}

export function GameBoardComponent({ gameBoard }: GameBoardComponentProps) {
  return (
    <section role='region' aria-label='The Game Board'>
      {gameBoard.board.map((square, index) => (
        <GameBoardButton
          key={index}
          testId={index.toString()}
          selectedShip={null}
          shipImageNumber={null}
          isHit={square.isHit}
          isMiss={square.isMiss}
        />
      ))}
    </section>
  );
}
