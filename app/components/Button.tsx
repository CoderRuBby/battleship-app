interface ButtonProps {
  className: string;
  buttonImg: string;
  testId?: string;
  shipOnClick: () => void;
  highlightedImg: string;
  isSelected: boolean;
}

export function Button({
  className,
  buttonImg,
  testId,
  shipOnClick,
  highlightedImg,
  isSelected,
}: ButtonProps) {
  return (
    <button
      className={className}
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
