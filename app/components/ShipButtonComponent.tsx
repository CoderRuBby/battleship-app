import { ShipButton } from './ShipButton';
import type { shipInterface } from '~/utils/ship';
import type { gameBoardInterface } from '~/utils/gameBoard';

interface ShipButtonComponentProps {
  player: gameBoardInterface;
  handleSelectShip: (shipButton: shipInterface) => void;
}

export function ShipButtonComponent({
  player,
  handleSelectShip,
}: ShipButtonComponentProps) {
  return (
    <section
      role='region'
      aria-label='The ship buttons'
      className="
        ship-button-container h-68
        w-[285.94px] p-4 gap-3  
        flex flex-wrap justify-around items-center
        bg-[url('/images/ship-container.svg')]
        bg-position-[10%] shadow-[0px_0px_9px_-1px_black]
        [@media(max-height:700px)]:h-68

        xs:p-8
        
        md:w-79.5 md:h-76 md:gap-7.5

        pointer-fine:md:h-84
        pointer-fine:lg:w-77.5
        pointer-fine:lg:h-94
        pointer-fine:xl:w-102.5
        pointer-fine:xl:h-114
      "
    >
      {player.props.allShips.map((ship) => (
        <ShipButton
          key={ship.props.name}
          testId={ship.props.name}
          shipOnClick={() => handleSelectShip(ship)}
          player={player}
        />
      ))}
    </section>
  );
}
