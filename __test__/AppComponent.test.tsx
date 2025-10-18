import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ship, type shipInterface } from '~/utils/Ship';
import { AppComponent } from '~/components/AppComponent';

describe('App', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let component: React.ReactElement;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    component = <AppComponent allShips={shipsArray} />;
  });

  it('can render 5 ship buttons and a gameboard', () => {
    render(component);

    const buttonCount = screen.getAllByRole('button').length;
    const carrierButton = screen.getByTestId('carrier');
    const destroyerButton = screen.getByTestId('destroyer');
    const submarineButton = screen.getByTestId('submarine');
    const battleshipButton = screen.getByTestId('battleship');
    const cruiserButton = screen.getByTestId('cruiser');

    expect(buttonCount).toBe(105);
    expect(carrierButton).toBeInTheDocument();
    expect(destroyerButton).toBeInTheDocument();
    expect(submarineButton).toBeInTheDocument();
    expect(battleshipButton).toBeInTheDocument();
    expect(cruiserButton).toBeInTheDocument();
  });
});
