import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ShipButtonComponent } from '~/components/ShipButtonComponent';
import type { gameBoardInterface } from '~/utils/gameBoard';
import gameBoard from '~/utils/gameBoard';
import type { shipInterface } from '~/utils/ship';
import ship from '~/utils/ship';

describe('ShipButtonComponent', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let buttons: shipInterface[];
  let component: React.ReactElement;
  let player: gameBoardInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    buttons = [carrier, destroyer, submarine];
    player = gameBoard(buttons);

    component = (
      <ShipButtonComponent player={player} handleSelectShip={() => {}} />
    );
  });

  it('can render a button container with buttons', () => {
    render(component);

    const buttonContainer = screen.getByRole('region', {
      name: 'The ship buttons',
    });
    const buttonOne = screen.getByTestId('carrier');
    const buttonTwo = screen.getByTestId('destroyer');
    const buttonThree = screen.getByTestId('submarine');

    expect(buttonContainer).toBeInTheDocument();
    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
    expect(buttonThree).toBeInTheDocument();
  });
});
