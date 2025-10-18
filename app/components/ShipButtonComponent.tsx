import { useState } from 'react';
import { ShipButton } from './ShipButton';

interface ShipButtonComponentProps {
  buttons: string[];
}

export function ShipButtonComponent({ buttons }: ShipButtonComponentProps) {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (testId: string) => {
    if (selectedButton === testId) {
      setSelectedButton(null);
    } else {
      setSelectedButton(testId);
    }
  };

  return (
    <section
      role='region'
      aria-label='The ship buttons'
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
  return <ShipButtonComponent buttons={shipButtons} />;
}
