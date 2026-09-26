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
      className={`
        w-full h-full flex items-center justify-center landscape:min-w-150
      `}
    >
      <div
        className='
          h-fit flex flex-col items-center justify-center gap-8 bg-[rgb(6,6,6,.93)] rounded-xl p-5 text-center
          portrait:md:h-80 portrait:md:w-80 portrait:md:gap-15
          portrait:lg:h-140 portrait:lg:w-120 lg:gap-20
          
          pointer-coarse:landscape:md:w-90 pointer-coarse:landscape:md:h-80
          pointer-coarse:landscape:lg:w-110 pointer-coarse:landscape:lg:h-90

          pointer-fine:landscape:md:w-90 pointer-fine:landscape:md:h-90
          pointer-fine:landscape:lg:w-120 pointer-fine:landscape:lg:h-100
        '
      >
        <h1
          className='
            text-5xl
            portrait:lg:text-6xl
            landscape:lg:text-6xl pointer-fine:landscape:lg:text-8xl
          '
        >
          You {winLoseText}
        </h1>
        <button
          onClick={resetGame}
          className='text-3xl p-3 shadow-[0px_0px_0px_6px_rgba(3,3,0,.2)] rounded-2xl animate-bg-transition
          lg:text-5xl pointer-fine:lg:text-6xl
          '
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
