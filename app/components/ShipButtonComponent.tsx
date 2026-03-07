import { ShipButton } from './ShipButton';
import type { shipInterface } from '~/utils/ship';
import type { gameBoardInterface } from '~/utils/gameBoard';

interface ShipButtonComponentProps {
  playerOne: gameBoardInterface;
  handleSelectShip: (shipButton: shipInterface) => void;
}

export function ShipButtonComponent({
  playerOne,
  handleSelectShip,
}: ShipButtonComponentProps) {
  return (
    <section
      role='region'
      aria-label='The ship buttons'
      className='ship-button-container'
    >
      {playerOne.props.allShips.map((button) => (
        <ShipButton
          key={button.props.name}
          testId={button.props.name}
          shipOnClick={() => handleSelectShip(button)}
          playerOne={playerOne}
        />
      ))}
    </section>
  );
}
