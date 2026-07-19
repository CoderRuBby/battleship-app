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
        max-w-[285.94px] ship-button-container 
        p-[1rem] 
        flex flex-wrap justify-around items-center
        gap-[30px] md:w-[20rem]
        shadow-[0px_0px_9px_-1px_black]
        bg-[url('/images/ship-container.svg')]
        bg-[10%]
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
