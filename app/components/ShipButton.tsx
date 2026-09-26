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

  const isPlaced = () => {
    if (player.props.allShips[shipIndex].props.isPlaced) {
      return true;
    } else {
      return false;
    }
  };

  const shipDiv = () => {
    const divClass =
      'w-[1.75rem] h-[1.75rem] pointer-coarse:portrait:xs:w-[2.25rem] [@media(max-height:700px)]:h-7 [@media(max-height:700px)]:w-7 pointer-coarse:portrait:xs:h-[2.25rem] portrait:sm:w-[2rem] portrait:sm:h-[2rem] pointer-coarse:portrait:md:w-[2.625rem] pointer-coarse:portrait:md:h-[2.625rem] pointer-coarse:portrait:lg:w-[3.5rem] pointer-coarse:portrait:lg:h-[3.5rem] portrait:md:w-8.5 portrait:md:h-8.5 landscape:md:w-9.5 landscape:md:h-9.5 landscape:lg:w-11.5 landscape:lg:h-11.5 landscape:xl:w-15 landscape:xl:h-15';

    const shipIndex = player.props.allShips.findIndex(
      (i) => i.props.name === testId,
    );
    const ship = player.props.allShips[shipIndex];
    const array: number[] = Array.from({ length: ship.props.length });
    return array.map((arr) => {
      return <div key={arr} className={divClass} />;
    });
  };

  return (
    <button
      className={`
          ${isPlaced() ? 'shadow-[0px_0px_0px_2px_rgba(0,193,44,1)]' : 'shadow-[0px_0px_0px_2px_rgba(155,27,27,1)]'} ship-button ${testId}-button ${testId} ${isSelected()} flex row
        `}
      data-testid={testId}
      onClick={shipOnClick}
    >
      <>{shipDiv()}</>
    </button>
  );
}
