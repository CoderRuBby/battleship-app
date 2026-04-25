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
      className={`ship-button ${testId} h-[clamp(1.7rem,2vw,2.5rem)] bg-center bg-cover bg-no-repeat
      `}
      data-testid={testId}
      style={buttonStyle}
      onClick={shipOnClick}
      disabled={isDisabled()}
    ></button>
  );
}
