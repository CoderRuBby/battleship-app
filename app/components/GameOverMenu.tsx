export interface gameOverMenuInterface {
  winLoseText: string;
  resetGame: () => void;
}

export function GameOverMenu({
  winLoseText,
  resetGame,
}: gameOverMenuInterface) {
  return (
    <div
      role='dialog'
      className="w-full h-full flex items-center justify-center bg-black landscape:min-w-150 portrait:bg-[url('/images/game-over-menu-portrait-bg.png')] bg-cover bg-center bg-no-repeat"
    >
      <div
        className='
          h-fit flex flex-col items-center justify-center gap-6 bg-blue-800 rounded-xl p-5 text-center
          pointer-fine:lg:landscape:w-[clamp(20rem,25vw,25rem)]
        '
      >
        <h1 className='text-5xl'>You {winLoseText}</h1>
        <button
          onClick={resetGame}
          className='text-3xl p-3 shadow-[0px_0px_0px_6px_rgba(3,3,0,.2)] rounded-2xl'
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
