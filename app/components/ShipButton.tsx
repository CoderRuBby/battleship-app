import type { gameBoardInterface } from '~/utils/gameBoard';

export interface ShipButtonProps {
  testId: string;
  shipOnClick: () => void;
  player: gameBoardInterface;
}

export function ShipButton({ testId, shipOnClick, player }: ShipButtonProps) {
  const shipIndex = player.props.allShips.findIndex(
    (ship) => ship.props.name === testId,
  );
  const buttonStyle = {
    background:
      player.props.selectedShip?.props.name === testId
        ? `url("highlighted${testId}.png")`
        : player.props.allShips[shipIndex].props.isPlaced === true
          ? `url("outline-${testId}.png")`
          : `url("${testId}.png")`,
  };

  const isDisabled = () => {
    if (player.props.allShips[shipIndex].props.isPlaced) {
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
