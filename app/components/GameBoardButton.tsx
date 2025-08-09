interface GameBoardButtonProps {
  className: string;
  onClick: () => void;
  testId?: string;
}

export function GameBoardButton({
  className,
  onClick,
  testId,
}: GameBoardButtonProps) {
  return (
    <button className={className} onClick={onClick} data-testid={testId} />
  );
}
