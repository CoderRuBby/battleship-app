interface GameBoardButtonProps {
  testId: string;
  selectedShip: string | null;
  shipImageNumber: string | null;
}

export function GameBoardButton({
  testId,
  selectedShip,
  shipImageNumber,
}: GameBoardButtonProps) {
  const buttonStyle = {
    background:
      selectedShip === testId
        ? `url("${selectedShip}${shipImageNumber}.png")`
        : 'rgba(0, 0, 0, 0)',
  };
  return <button data-testid={testId} style={buttonStyle}></button>;
}
