import { ShipButton } from './ShipButton';
import type { shipInterface } from '~/utils/ship';
import type { gameBoardInterface } from '~/utils/gameBoard';
import { BoardContainer } from './BoardContainer';

interface ShipButtonComponentProps {
  player: gameBoardInterface;
  handleSelectShip: (shipButton: shipInterface) => void;
}

export function ShipButtonComponent({
  player,
  handleSelectShip,
}: ShipButtonComponentProps) {
  return (
    <BoardContainer label='The ship buttons'>
      {player.props.allShips.map((ship) => (
        <ShipButton
          key={ship.props.name}
          testId={ship.props.name}
          shipOnClick={() => handleSelectShip(ship)}
          player={player}
        />
      ))}
    </BoardContainer>
  );
}
