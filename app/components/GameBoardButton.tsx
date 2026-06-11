import type { gameBoardInterface } from '~/utils/gameBoard';
import shipPlacementSystem from '~/utils/shipPlacementSystem';

interface GameBoardButtonProps {
  testId: string;
  player: gameBoardInterface;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  handleOnClick: (id: number) => void;
  dblClick: (id: number) => void;
  hoverId: number | null;
}

export function GameBoardButton({
  testId,
  player,
  onMouseEnter,
  onMouseLeave,
  handleOnClick,
  dblClick,
  hoverId,
}: GameBoardButtonProps) {
  const { getShipPaths } = shipPlacementSystem();
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
  const imageDirectionClass = (direction: string | null) => {
    if (direction !== null) {
      return direction;
    } else {
      return '';
    }
  };

  const divBackgroundClass = () => {
    if (player.board[Number(testId)].ship) {
      return `${player.board[Number(testId)].ship?.props.name}`;
    } else if (player.props.selectedShip !== null) {
      return `${player.props.selectedShip.props.name}`;
    } else {
      return '';
    }
  };

  const showShipImage = () => {
    // Never show placed ships on AI boards (unless sunk)
    if (player.props.aiPlayer) {
      return boardNumber.ship?.props.sunk === true;
    }

    // Show possible placement when a ship is selected and hovering
    if (player.props.selectedShip && hoverId === Number(testId)) {
      return true;
    }

    // Show placed ship image only for the start square or if sunk
    if (boardNumber.ship?.props.isPlaced || boardNumber.ship?.props.sunk) {
      return true;
    }
  };

  const getPaths = () => {
    const selectedShip = player.props.selectedShip;
    // Return ship direction when a ship has been placed or sunk
    if (
      (boardNumber.ship?.props.isPlaced &&
        boardNumber.ship.props.shipStartPoint === Number(testId)) ||
      boardNumber.ship?.props.sunk
    ) {
      return [{ direction: boardNumber.ship.props.direction }];
    }
    // Compute ship paths when a ship is selected (for hover preview)
    if (selectedShip) {
      return getShipPaths(selectedShip.props.length, Number(testId), player);
    }

    return [];
  };

  const getGradientDirection = (direction: string | null) => {
    if (
      player.props.selectedShip?.props.isPlaced === false &&
      direction !== null
    ) {
      return `${direction}-gradient-mask`;
    } else {
      return '';
    }
  };

  return (
    <button
      className='
        w-[1.7rem] h-[1.7rem] border-1 relative
        xl:w-[2.5rem] xl:h-[2.5rem]
        '
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
        getPaths().map((path, index) => {
          return (
            <div
              className={`
                ${imageDirectionClass(path.direction)}
                ${divBackgroundClass()}-${imageDirectionClass(path.direction)} 
                ${getGradientDirection(path.direction)}
                board-${divBackgroundClass()}
                 h-[1.7rem] absolute pointer-events-none xl:h-[2.6rem]
                `}
              key={`${path.direction}-${index}`}
              data-testid={path.direction}
            />
          );
        })}
    </button>
  );
}
