export interface gameOverMenuInterface {
  winLoseText: string;
  resetGame: () => void;
}

export function GameOverMenu({
  winLoseText,
  resetGame,
}: gameOverMenuInterface) {
  const isWinningBg = () => {
    if (winLoseText === 'Win') {
      return true;
    }
  };

  const isLosingBg = () => {
    if (winLoseText === 'Lose') {
      return true;
    }
  };

  return (
    <div
      role='dialog'
      className={`
        ${isWinningBg() || isLosingBg() ? "portrait:bg-[url('/images/winning-menu-portrait-bg.png')] landscape:bg-[url('/images/winning-menu-landscape-bg.png')]" : "portrait:bg-[url('/images/losing-menu-portrait-bg.png')] landscape:bg-[url('/images/losing-menu-landscape-bg.png')]"}
        w-full h-full flex items-center justify-center landscape:min-w-150 bg-center bg-no-repeat bg-contain portrait:bg-cover
      `}
    >
      <div
        className='
          h-fit flex flex-col items-center justify-center gap-6 bg-[rgb(6,6,6,.93)] rounded-xl p-5 text-center
          pointer-fine:lg:landscape:w-[clamp(20rem,25vw,25rem)]
        '
      >
        <h1 className='text-5xl'>You {winLoseText}</h1>
        <button
          onClick={resetGame}
          className='text-3xl p-3 shadow-[0px_0px_0px_6px_rgba(3,3,0,.2)] rounded-2xl animate-bg-transition'
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
