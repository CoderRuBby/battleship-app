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
        ship-button-container 
        max-w-[285.94px] p-[1rem] gap-[30px] 
        flex flex-wrap justify-around items-center
        bg-[url('/images/ship-container.svg')]
        bg-[10%] shadow-[0px_0px_9px_-1px_black]
        md:w-[20rem] md:p-[3.6rem]
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
