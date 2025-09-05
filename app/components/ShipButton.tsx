interface ShipButtonProps {
  className: string;
  buttonImg: string;
  testId?: string;
  shipOnClick: () => void;
  highlightedImg: string;
  isSelected: boolean;
}

export function ShipButton({
  buttonImg,
  testId,
  shipOnClick,
  highlightedImg,
  isSelected,
}: ShipButtonProps) {
  return (
    <button
      className='ship-button'
      data-testid={testId}
      style={{
        background: `url(${isSelected ? highlightedImg : buttonImg})`,
        //!put css into own component to be passed as prop
        backgroundColor: 'blue',
        height: '100px',
        width: '100px',
      }}
      onClick={shipOnClick}
    ></button>
  );
}
