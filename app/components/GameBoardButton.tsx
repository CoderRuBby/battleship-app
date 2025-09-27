interface GameBoardButtonProps {
  testId: string;
  selectedShip: string | null;
  shipImageNumber: string | null;
  isHit: boolean | null;
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
      selectedShip === testId
        ? `url("${selectedShip}${shipImageNumber}.png")`
        : isHit === true
          ? 'url("hit.png")'
          : isMiss === true
            ? 'url("miss.png")'
            : 'rgba(0, 0, 0, 0)',
  };
  return <button data-testid={testId} style={buttonStyle}></button>;
}
