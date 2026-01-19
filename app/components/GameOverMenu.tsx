export interface gameOverMenuInterface {
  winLoseText: string;
}

export function GameOverMenu({ winLoseText }: gameOverMenuInterface) {
  return (
    <div role='dialog'>
      <h1>You {winLoseText}</h1>
    </div>
  );
}
