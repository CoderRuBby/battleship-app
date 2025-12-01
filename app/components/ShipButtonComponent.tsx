import { useState } from 'react';
import { ShipButton } from './ShipButton';
import type { shipInterface } from '~/utils/Ship';

interface ShipButtonComponentProps {
  buttons: shipInterface[];
  handleSelectShip: (shipButton: shipInterface) => void;
}

export function ShipButtonComponent({
  buttons,
  handleSelectShip,
}: ShipButtonComponentProps) {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (shipButton: shipInterface) => {
    handleSelectShip(shipButton);
    if (selectedButton === shipButton.name) {
      setSelectedButton(null);
    } else {
      setSelectedButton(shipButton.name);
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
          key={button.name}
          testId={button.name}
          shipOnClick={() => handleButtonClick(button)}
          isSelected={selectedButton}
        />
      ))}
    </section>
  );
}
