import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ShipButtonComponent } from '~/components/ShipButtonComponent';
import { createPlayer1 } from './testData';

describe('ShipButtonComponent', () => {
  let player1: ReturnType<typeof createPlayer1>;
  let component: React.ReactElement;

  beforeEach(() => {
    player1 = createPlayer1();

    component = (
      <ShipButtonComponent player={player1} handleSelectShip={() => {}} />
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
