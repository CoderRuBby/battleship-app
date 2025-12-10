import type { shipInterface } from '~/utils/Ship';

interface GameBoardButtonProps {
  testId: string;
  selectedShip: shipInterface | null;
  shipImageNumber: number | null;
  imageDirection: string | null;
  isHit: boolean;
  isMiss: boolean;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  handleOnClick: (id: number, selectedShip: shipInterface | null) => void;
}

export function GameBoardButton({
  testId,
  selectedShip,
  shipImageNumber,
  imageDirection,
  isHit,
  isMiss,
  onMouseEnter,
  onMouseLeave,
  handleOnClick,
}: GameBoardButtonProps) {
  const buttonStyle = {
    background:
      shipImageNumber !== null
        ? `url("${selectedShip?.name}${shipImageNumber}${imageDirection}.png")`
        : isHit === true
          ? 'url("hit.png")'
          : isMiss === true
            ? 'url("miss.png")'
            : 'rgba(0, 0, 0, 0)',
  };
  return (
    <button
      data-testid={testId}
      style={buttonStyle}
      onMouseEnter={() => onMouseEnter(Number(testId))}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => handleOnClick(Number(testId), selectedShip)}
    ></button>
  );
}
