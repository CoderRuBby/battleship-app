import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShipButton } from '~/components/ShipButton';
import { createPlayer1 } from './testData';

describe('ShipButton', () => {
  let onClick: () => void;
  let player1: ReturnType<typeof createPlayer1>;
  let component: React.ReactElement;

  beforeEach(() => {
    onClick = vi.fn();
    player1 = createPlayer1();
    component = (
      <ShipButton testId='carrier' shipOnClick={onClick} player={player1} />
    );
  });

  it('will render a button with a carrier class', () => {
    render(component);

    const buttonElement = screen.getByTestId('carrier');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('carrier');
  });

  it('will call the onClick function when clicked', async () => {
    const user = userEvent.setup();

    render(component);

    const buttonElement = screen.getByTestId('carrier');
    await user.click(buttonElement);

    expect(onClick).toHaveBeenCalled();
  });

  it('will render a button with a ship-outline class', () => {
    player1.props.selectedShip = player1.props.allShips[0];

    render(component);

    const buttonElement = screen.getByTestId('carrier');

    expect(buttonElement).toHaveClass('ship-outline');
  });

  it('will not be able to be selected after ship is placed on the gameboard', async () => {
    const user = userEvent.setup();
    player1.props.allShips[0].props.isPlaced = true;

    render(component);

    const cruiserButton = screen.getByTestId('carrier');

    await user.click(cruiserButton);

    expect(onClick).not.toBeCalled();
    expect(cruiserButton).not.toHaveClass('ship-outline');
  });
});
