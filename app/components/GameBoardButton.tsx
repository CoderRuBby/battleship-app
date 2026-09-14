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

  const returnHitOrMiss = (id: number) => {
    if (player.board[id].isHit === true) {
      return 'hit';
    } else if (player.board[id].isMiss) {
      return 'miss';
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
      return (
        boardNumber.ship?.props.sunk === true &&
        boardNumber.ship.props.shipStartPoint === Number(testId)
      );
    }

    // Show possible placement when a ship is selected and hovering
    if (player.props.selectedShip && hoverId !== null) {
      const array: number[] = [];
      const paths = getShipPaths(
        player.props.selectedShip.props.length,
        hoverId,
        player,
      );
      paths.forEach((path) => {
        array.push(path.array[path.array.length - 1]);
      });
      if (array.includes(Number(testId))) return true;
    }

    // Show placed ship image only for the start square or if sunk
    if (
      boardNumber.ship?.props.shipStartPoint === Number(testId) &&
      boardNumber.ship?.props.isPlaced
    ) {
      return true;
    }
  };

  const getGradientDirection = (direction: string | null) => {
    if (
      !boardNumber.ship?.props.shipEndPoint &&
      !player.props.selectedShip?.props.isPlaced
    ) {
      return `${direction}-gradient-mask`;
    }
  };

  const getPathObject = () => {
    if (player.props.selectedShip && hoverId !== null) {
      const paths = getShipPaths(
        player.props.selectedShip.props.length,
        hoverId,
        player,
      );
      const index = paths.findIndex((n) => n.array.includes(Number(testId)));
      return paths[index];
    } else return null;
  };

  const getDirection = () => {
    const pathObject = getPathObject();
    if (
      (boardNumber.ship?.props.isPlaced &&
        boardNumber.ship.props.shipStartPoint === Number(testId)) ||
      boardNumber.ship?.props.sunk
    ) {
      return boardNumber.ship.props.direction;
    }
    if (pathObject?.direction) {
      return pathObject?.direction;
    } else {
      return null;
    }
  };

  const getShipImage = () => {
    const ship = divBackgroundClass();
    const direction = getDirection();
    const imageURL = `url('/public/images/${ship}-${direction}.png')`;
    return { backgroundImage: imageURL };
  };

  const reverseDirection = (direction: string | null) => {
    if (boardNumber.ship?.props.isPlaced) {
      if (direction === 'left' || direction === 'up') {
        return 'end';
      }
      if (direction === 'right' || direction === 'down') {
        return 'start';
      }
    }
  };

  const buttonClass =
    'w-[1.75rem] h-[1.75rem] pointer-coarse:portrait:xs:w-[2.25rem] pointer-coarse:portrait:xs:h-[2.25rem] portrait:sm:w-[2rem] portrait:sm:h-[2rem] pointer-coarse:portrait:md:w-[2.625rem] pointer-coarse:portrait:md:h-[2.625rem] pointer-coarse:portrait:lg:w-[3.5rem] pointer-coarse:portrait:lg:h-[3.5rem] portrait:md:w-8.5 portrait:md:h-8.5 pointer-fine:landscape:md:w-9.5 pointer-fine:landscape:md:h-9.5 landscape:lg:w-11.5 landscape:lg:h-11.5 landscape:xl:w-15 landscape:xl:h-15';

  const shipDiv = () => {
    let pathObj;
    let pathArray;
    if (boardNumber.ship !== null) {
      pathArray = boardNumber.ship.props.placedLocations;
    } else {
      pathObj = getPathObject();
      pathArray = pathObj?.array;
    }

    return (
      <div
        style={getShipImage()}
        className={`
          ${getDirection()}
          ${divBackgroundClass()}-${getDirection()} 
          ${boardNumber.ship ?? getGradientDirection(getDirection())}
          h-fit w-fit flex bg-center bg-contain bg-no-repeat
          pointer-events-none 
          z-1
        `}
        key={`${getDirection()}-${testId}`}
        data-testid={getDirection()}
      >
        {pathArray?.map((square) => (
          <div
            key={square}
            data-testid={square}
            className={`${returnHitOrMiss(Number(square))} ${buttonClass} border-0 shadow-[0px_0px_0px_1px_violet]`}
          />
        ))}
      </div>
    );
  };

  return (
    <button
      className={`${returnHitOrMiss(Number(testId))} ${showShipImage() && getDirection()} ${showShipImage() && reverseDirection(getDirection())} shadow-[0px_0px_3px_1px_black] flex w-[inherit] h-[inherit]`}
      data-testid={testId}
      onMouseEnter={() => onMouseEnter(Number(testId))}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => handleOnClick(Number(testId))}
      onDoubleClick={() => dblClick(Number(testId))}
    >
      {showShipImage() && shipDiv()}
    </button>
  );
}
