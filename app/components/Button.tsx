interface ButtonProps {
  className: string;
  buttonImg: string;
  testId?: string;
  shipOnClick: () => void;
}

export function Button({
  className,
  buttonImg,
  testId,
  shipOnClick,
}: ButtonProps) {
  return (
    <button
      className={className}
      data-testid={testId}
      style={{
        background: buttonImg,
        //!put css into own component to be passed as prop
        backgroundColor: 'blue',
        height: '100px',
        width: '100px',
      }}
      onClick={shipOnClick}
    ></button>
  );
}
