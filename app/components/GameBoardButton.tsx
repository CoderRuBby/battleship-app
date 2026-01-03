import type { gameBoardInterface } from '~/utils/GameBoard';

interface GameBoardButtonProps {
  //! refactor: remove redundant props
  testId: string;
  shipImageNumber: number | null;
  imageDirection: string | null;
  isHit: boolean;
  isMiss: boolean;
  playerGameBoard: gameBoardInterface;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  handleOnClick: (id: number) => void;
}

export function GameBoardButton({
  //! refactor: remove redundant props
  testId,
  shipImageNumber,
  imageDirection,
  isHit,
  isMiss,
  playerGameBoard,
  onMouseEnter,
  onMouseLeave,
  handleOnClick,
}: GameBoardButtonProps) {
  const buttonStyle = {
    background:
      isHit === true
        ? 'url("hit.png")'
        : isMiss === true
          ? 'url("miss.png")'
          : playerGameBoard.board[Number(testId)]?.ship !== null
            ? `url("${playerGameBoard.board[Number(testId)]?.ship?.name}${playerGameBoard.board[Number(testId)]?.imageNumber}${playerGameBoard.board[Number(testId)]?.imageDirection}.png")`
            : shipImageNumber !== null
              ? `url("${playerGameBoard.selectedShip?.name}${shipImageNumber}${imageDirection}.png")`
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
