export interface gameOverMenuInterface {
  winLoseText: string;
  resetGame: () => void;
}

export function GameOverMenu({
  winLoseText,
  resetGame,
}: gameOverMenuInterface) {
  return (
    <div role='dialog'>
      <h1>You {winLoseText}</h1>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
}
