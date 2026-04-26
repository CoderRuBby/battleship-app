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

  const isSelected = () => {
    if (player.props.selectedShip?.props.name === testId) {
      return 'ship-outline';
    } else {
      return '';
    }
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
      className={`ship-button ${testId} ${isSelected()} h-[clamp(1.7rem,2vw,2.5rem)]`}
      data-testid={testId}
      onClick={shipOnClick}
      disabled={isDisabled()}
    ></button>
  );
}
