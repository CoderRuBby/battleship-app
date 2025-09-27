interface GameBoardButtonProps {
  testId: string;
}

export function GameBoardButton({ testId }: GameBoardButtonProps) {
  return (
    <button
      data-testid={testId}
      style={{ background: 'rgba(0, 0, 0, 0)' }}
    ></button>
  );
}
