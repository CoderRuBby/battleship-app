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
    backgroundImage:
      player.props.selectedShip?.props.name === testId
        ? `url("/images/highlighted-${testId}.png")`
        : player.props.allShips[shipIndex].props.isPlaced === true
          ? `url("/images/outline-${testId}.png")`
          : `url("/images/${testId}.png")`,
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
      className={`ship-button ${testId} border-1 h-20 bg-center bg-cover bg-no-repeat`}
      data-testid={testId}
      style={buttonStyle}
      onClick={shipOnClick}
      disabled={isDisabled()}
    ></button>
  );
}
