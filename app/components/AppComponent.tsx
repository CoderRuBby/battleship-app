import type { shipInterface } from '~/utils/Ship';
import { ShipButtonComponent } from './ShipButtonComponent';
import { GameBoardComponent } from './GameBoardComponent';
import { useState } from 'react';

export interface appComponentProps {
  allShips: shipInterface[];
}

export function AppComponent({ allShips }: appComponentProps) {
  const [selectedShip, setSelectedShip] = useState<shipInterface | null>(null);
  const shipButtons = () => {
    return allShips.map((ship) => {
      return ship.name;
    });
  };
  return (
    <main>
      <ShipButtonComponent buttons={shipButtons()} />
      <GameBoardComponent allShips={allShips} selectedShip={selectedShip} />
    </main>
  );
}
