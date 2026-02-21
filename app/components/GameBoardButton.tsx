import type { gameBoardInterface } from '~/utils/gameBoard';

interface GameBoardButtonProps {
  testId: string;
  board: gameBoardInterface;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  handleOnClick: (id: number) => void;
}

export function GameBoardButton({
  //! refactor: remove redundant props
  testId,
  board,
  onMouseEnter,
  onMouseLeave,
  handleOnClick,
}: GameBoardButtonProps) {
  const boardNumber = board.board[Number(testId)];
  const shipName = boardNumber?.ship?.props.name;
  const imgNumber = boardNumber?.imageNumber;
  const imgDirection = boardNumber?.imageDirection;
  const selectedShipName = board.props.selectedShip?.props.name;
  const isAi = board.props.aiPlayer;
  const isShipSunk = boardNumber?.ship?.props.sunk;
  const buttonStyle = {
    background:
      isShipSunk === true
        ? `url("${shipName}${imgNumber}${imgDirection}-sunk.png")`
        : boardNumber?.isHit === true
          ? 'url("hit.png")'
          : boardNumber?.isMiss === true
            ? 'url("miss.png")'
            : boardNumber?.ship !== null && isAi === false
              ? `url("${shipName}${imgNumber}${imgDirection}.png")`
              : imgNumber !== null && isAi === false
                ? `url("${selectedShipName}${imgNumber}${imgDirection}.png")`
                : 'rgba(0, 0, 0, 0)',
  };
  return (
    <button
      data-testid={testId}
      style={buttonStyle}
      onMouseEnter={() => onMouseEnter(Number(testId))}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => handleOnClick(Number(testId))}
    ></button>
  );
}
