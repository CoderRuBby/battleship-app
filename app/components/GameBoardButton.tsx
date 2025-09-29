import type { shipInterface } from '~/utils/Ship';

interface GameBoardButtonProps {
  testId: string;
  selectedShip: shipInterface | null;
  shipImageNumber: string | null;
  isHit: boolean;
  isMiss: boolean;
}

export function GameBoardButton({
  testId,
  selectedShip,
  shipImageNumber,
  isHit,
  isMiss,
}: GameBoardButtonProps) {
  const buttonStyle = {
    background:
      selectedShip?.name === testId
        ? `url("${selectedShip.name}${shipImageNumber}.png")`
        : isHit === true
          ? 'url("hit.png")'
          : isMiss === true
            ? 'url("miss.png")'
            : 'rgba(0, 0, 0, 0)',
  };
  return <button data-testid={testId} style={buttonStyle}></button>;
}
