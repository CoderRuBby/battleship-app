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
      className='
        ship-button-container
        flex flex-wrap justify-around items-center
        w-[clamp(17rem,18vw,20rem)]
      '
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
