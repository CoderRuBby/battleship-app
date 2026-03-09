import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShipButton } from '~/components/ShipButton';
import type { gameBoardInterface } from '~/utils/gameBoard';
import gameBoard from '~/utils/gameBoard';
import ship, { type shipInterface } from '~/utils/ship';

describe('ShipButton', () => {
  let onClick: () => void;
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let playerOne: gameBoardInterface;

  beforeEach(() => {
    onClick = vi.fn();
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    playerOne = gameBoard(shipsArray);
  });

  it('will render a button with a carrier.png background', () => {
    render(
      <ShipButton
        testId='carrier'
        shipOnClick={onClick}
        playerOne={playerOne}
      />,
    );

    const buttonElement = screen.getByTestId('carrier');
    const style = getComputedStyle(buttonElement);

    expect(buttonElement).toBeInTheDocument();
    expect(style.backgroundImage).toContain('carrier.png');
  });

  it('will call the onClick function when clicked', async () => {
    const user = userEvent.setup();

    render(
      <ShipButton
        testId='carrier'
        shipOnClick={onClick}
        playerOne={playerOne}
      />,
    );

    const buttonElement = screen.getByTestId('carrier');
    await user.click(buttonElement);

    expect(onClick).toHaveBeenCalled();
  });

  it('will render a button with a highlightedcarrier.png background', () => {
    playerOne.props.selectedShip = carrier;
    render(
      <ShipButton
        testId='carrier'
        shipOnClick={onClick}
        playerOne={playerOne}
      />,
    );

    const buttonElement = screen.getByTestId('carrier');
    const style = getComputedStyle(buttonElement);

    expect(style.backgroundImage).toContain('highlightedcarrier.png');
  });

  it('will render a button with an outline background image', () => {
    playerOne.props.allShips[0].props.isPlaced = true;
    render(
      <ShipButton
        testId='carrier'
        shipOnClick={onClick}
        playerOne={playerOne}
      />,
    );

    const buttonElement = screen.getByTestId('carrier');
    const style = getComputedStyle(buttonElement);

    expect(style.backgroundImage).toContain('outline-carrier.png');
  });

  it('will not be able to be selected after ship is placed on the gameboard', async () => {
    const user = userEvent.setup();
    playerOne.props.allShips[0].props.isPlaced = true;

    render(
      <ShipButton
        testId='carrier'
        shipOnClick={onClick}
        playerOne={playerOne}
      />,
    );

    const cruiserButton = screen.getByTestId('carrier');

    await user.click(cruiserButton);

    expect(onClick).not.toBeCalled();
    expect(cruiserButton.style.background).toContain('outline-carrier.png');
  });
});
