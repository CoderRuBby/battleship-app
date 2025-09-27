export interface ShipButtonProps {
  testId: string;
  shipOnClick: () => void;
  isSelected: string | null;
}

export function ShipButton({
  testId,
  shipOnClick,
  isSelected,
}: ShipButtonProps) {
  return (
    <button
      className='ship-button'
      data-testid={testId}
      style={{
        background: `url(${isSelected === testId ? `highlighted${testId}` : testId}.png)`,
        //!put css into own component to be passed as prop
        height: '100px',
        width: '100px',
      }}
      onClick={shipOnClick}
    ></button>
  );
}
