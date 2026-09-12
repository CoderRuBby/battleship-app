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
    'w-[1.6rem] h-[1.6rem] border flex landscape:h-[1.6rem] landscape:w-[1.6rem] [@media(max-height:700px)]:h-[1.6rem] md:portrait:w-[1.6rem] md:portrait:h-[1.6rem] md:h-[1.8rem] md:w-[1.8rem] xl:w-10 xl:h-10 pointer-coarse:md:landscape:h-[1.8rem] pointer-coarse:md:landscape:w-[1.8rem] pointer-fine:md:landscape:w-[1.6rem] pointer-fine:md:landscape:h-8 pointer-fine:lg:landscape:w-7 pointer-fine:lg:landscape:h-9 pointer-fine:xl:landscape:w-9.5 pointer-fine:xl:landscape:h-11 lg:landscape:h-w-[clamp(1.8rem,3.5dvh,3rem)]';

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
          flex bg-center bg-contain bg-no-repeat
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
            className={`${returnHitOrMiss(Number(square))} ${buttonClass} border-0`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={buttonClass}
      data-testid={testId}
      onMouseEnter={() => onMouseEnter(Number(testId))}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => handleOnClick(Number(testId))}
      onDoubleClick={() => dblClick(Number(testId))}
    >
      <button
        className={`${getDirection()} ${reverseDirection(getDirection())} ${returnHitOrMiss(Number(testId))} w-[inherit] h-[inherit] flex`}
      >
        {showShipImage() && shipDiv()}
      </button>
    </div>
  );
}
