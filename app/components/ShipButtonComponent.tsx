import { useState } from 'react';
import { ShipButton } from './ShipButton';

interface ShipButtonComponentProps {
  ariaLabel?: string;
  buttons: string[];
}

export function ShipButtonComponent({
  ariaLabel,
  buttons,
}: ShipButtonComponentProps) {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (testId: string) => {
    setSelectedButton(testId);
  };

  return (
    <section
      role='region'
      aria-label={ariaLabel}
      className='ship-button-container'
    >
      {buttons.map((button) => (
        <ShipButton
          key={button}
          testId={button}
          shipOnClick={() => handleButtonClick(button)}
          isSelected={selectedButton}
        />
      ))}
    </section>
  );
}

const shipButtons: string[] = [
  'destroyer',
  'battleship',
  'carrier',
  'Submarine',
  'cruiser',
];

export function ShipButtonsMain() {
  return (
    <ShipButtonComponent
      ariaLabel='The game ship buttons'
      buttons={shipButtons}
    />
  );
}
