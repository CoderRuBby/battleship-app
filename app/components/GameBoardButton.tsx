import type { gameBoardInterface } from '~/utils/gameBoard';

interface GameBoardButtonProps {
  testId: string;
  player: gameBoardInterface;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  handleOnClick: (id: number) => void;
  dblClick: (id: number) => void;
}

export function GameBoardButton({
  testId,
  player,
  onMouseEnter,
  onMouseLeave,
  handleOnClick,
  dblClick,
}: GameBoardButtonProps) {
  const boardNumber = player.board[Number(testId)];
  const isHitOrMiss = () => {
    if (boardNumber.isHit || boardNumber.isMiss) {
      return true;
    }
  };
  const returnHitOrMiss = () => {
    if (boardNumber?.isHit === true) {
      return 'hit';
    } else if (boardNumber?.isMiss) {
      return 'miss';
    }
  };
  const imageDirectionClass = (direction: string) => {
    if (direction !== null) {
      return direction;
    } else {
      return '';
    }
  };

  const divBackgroundClass = () => {
    if (player.props.selectedShip !== null) {
      return `board-${player.props.selectedShip.props.name}`;
    } else if (player.board[Number(testId)].ship) {
      return `board-${player.board[Number(testId)].ship?.props.name}`;
    } else {
      return '';
    }
  };

  const showShipImage = () => {
    if (boardNumber.displayShipImage || boardNumber.ship?.props.sunk) {
      return true;
    }
  };

  return (
    <button
      className='
        w-[clamp(1.7rem,2vw,2.5rem)] h-[clamp(1.7rem,2vw,2.5rem)] border-1'
      data-testid={testId}
      onMouseEnter={() => onMouseEnter(Number(testId))}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => handleOnClick(Number(testId))}
      onDoubleClick={() => dblClick(Number(testId))}
    >
      {isHitOrMiss() && (
        <div
          data-testid={returnHitOrMiss()}
          className={returnHitOrMiss()}
        ></div>
      )}
      {showShipImage() &&
        player.board[Number(testId)].classDirections.map((direction, index) => {
          return (
            <div
              key={`${direction}-${index}`}
              data-testid={direction}
              className={`${imageDirectionClass(direction)} ${divBackgroundClass()}`}
            />
          );
        })}
    </button>
  );
}
