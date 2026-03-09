import type { gameBoardInterface } from '~/utils/gameBoard';

export interface ShipButtonProps {
  testId: string;
  shipOnClick: () => void;
  playerOne: gameBoardInterface;
}

export function ShipButton({
  testId,
  shipOnClick,
  playerOne,
}: ShipButtonProps) {
  const shipIndex = playerOne.props.allShips.findIndex(
    (ship) => ship.props.name === testId,
  );
  const buttonStyle = {
    background:
      playerOne.props.selectedShip?.props.name === testId
        ? `url("highlighted${testId}.png")`
        : playerOne.props.allShips[shipIndex].props.isPlaced === true
          ? `url("outline-${testId}.png")`
          : `url("${testId}.png")`,
  };

  const isDisabled = () => {
    if (playerOne.props.allShips[shipIndex].props.isPlaced) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <button
      className='ship-button'
      data-testid={testId}
      style={buttonStyle}
      onClick={shipOnClick}
      disabled={isDisabled()}
    ></button>
  );
}
