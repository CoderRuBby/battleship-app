import type { gameBoardInterface } from '~/utils/gameBoard';

export interface ShipButtonProps {
  testId: string;
  shipOnClick: () => void;
  playerOne: gameBoardInterface;
}

export function ShipButton({
  testId,
  shipOnClick,
  playerOne,
}: ShipButtonProps) {
  const buttonStyle = {
    background:
      playerOne.props.selectedShip?.props.name === testId
        ? `url("highlighted${testId}.png")`
        : `url("${testId}.png")`,
  };
  return (
    <button
      className='ship-button'
      data-testid={testId}
      style={buttonStyle}
      onClick={shipOnClick}
    ></button>
  );
}
