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
  const shipName = boardNumber?.ship?.props.name;
  const imgNumber = boardNumber?.imageNumber;
  const imgDirection = boardNumber?.imageDirection;
  const selectedShipName = player.props.selectedShip?.props.name;
  const isAi = player.props.aiPlayer;
  const isShipSunk = boardNumber?.ship?.props.sunk;
  const imageBackground = () => {
    let image: string | null = null;
    if (isShipSunk === true) {
      image = `${shipName}-${imgNumber}-sunk`;
    } else if (boardNumber?.isHit === true) {
      image = 'hit';
    } else if (boardNumber?.isMiss) {
      image = 'miss';
    } else if (boardNumber?.ship != null && isAi === false) {
      image = `${shipName}-${imgNumber}`;
    } else if (imgNumber != null && isAi === false) {
      image = `${selectedShipName}-${imgNumber}`;
    }
    return image ? `url('/images/${image}.png')` : 'rgba(0, 0, 0, 0)';
  };
  const imageDirectionClass = () => {
    if (imgDirection !== null && imgDirection !== 'right') {
      return imgDirection;
    } else {
      return null;
    }
  };
  return (
    <button
      className={`
        ${imageDirectionClass() ? imageDirectionClass() : ''}
        w-[clamp(1.7rem,2vw,2.5rem)] h-[clamp(1.7rem,2vw,2.5rem)] border-1
      `}
      style={{
        background: imageBackground(),
      }}
      data-testid={testId}
      onMouseEnter={() => onMouseEnter(Number(testId))}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => handleOnClick(Number(testId))}
      onDoubleClick={() => dblClick(Number(testId))}
    ></button>
  );
}
