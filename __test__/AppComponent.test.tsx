import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, test } from 'vitest';
import type { shipInterface } from '~/utils/Ship';
import ship from '~/utils/Ship';
import { AppComponent } from '~/components/AppComponent';
import userEvent from '@testing-library/user-event';
import type { gameBoardInterface } from '~/utils/GameBoard';
import gameBoard from '~/utils/GameBoard';

describe('App', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let playerGameBoard: gameBoardInterface;
  let component: React.ReactElement;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    playerGameBoard = gameBoard(shipsArray);

    component = (
      <AppComponent allShips={shipsArray} gameBoard={playerGameBoard} />
    );
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

  test('mouseenter renders the selected ship image on possible locations', async () => {
    const user = userEvent.setup();

    render(component);

    const destroyerButton = screen.getByTestId('destroyer');
    await user.click(destroyerButton);

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer1up.png")');
    expect(button45Style.background).not.toContain('url("destroyer1left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("destroyer1down.png")');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("destroyer2down.png")');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("destroyer1left.png")');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("destroyer0left.png")');

    const button35 = screen.getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("destroyer1up.png")');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("destroyer0up.png")');
  });

  test('mouseleave removes ship image on possible locations', async () => {
    const user = userEvent.setup();

    render(component);

    const destroyerButton = screen.getByTestId('destroyer');
    await user.click(destroyerButton);

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    await user.unhover(button45);

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer2up.png")');
    expect(button45Style.background).not.toContain('url("destroyer2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).not.toContain(
      'url("destroyer1right.png")',
    );
    expect(button46Style.background).toContain('rgba(0, 0, 0, 0)');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).not.toContain(
      'url("destroyer2right.png")',
    );
    expect(button47Style.background).toContain('rgba(0, 0, 0, 0)');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).not.toContain('url("destroyer1down.png")');
    expect(button55Style.background).toContain('rgba(0, 0, 0, 0)');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).not.toContain('url("destroyer2down.png")');
    expect(button65Style.background).toContain('rgba(0, 0, 0, 0)');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).not.toContain('url("destroyer1left.png")');
    expect(button44Style.background).toContain('rgba(0, 0, 0, 0)');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).not.toContain('url("destroyer0left.png")');
    expect(button43Style.background).toContain('rgba(0, 0, 0, 0)');

    const button35 = screen.getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).not.toContain('url("destroyer1up.png")');
    expect(button35Style.background).toContain('rgba(0, 0, 0, 0)');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).not.toContain('url("destroyer0up.png")');
    expect(button25Style.background).toContain('rgba(0, 0, 0, 0)');
  });

  test('mouseleave renders the selected ship image on possible locations when a square is selected', async () => {
    const user = userEvent.setup();

    render(component);

    const destroyerButton = screen.getByTestId('destroyer');
    await user.click(destroyerButton);

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    await user.click(button45);

    await user.unhover(button45);

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer2up.png")');
    expect(button45Style.background).not.toContain('url("destroyer2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("destroyer1down.png")');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("destroyer2down.png")');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("destroyer1left.png")');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("destroyer0left.png")');

    const button35 = screen.getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("destroyer1up.png")');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("destroyer0up.png")');
  });

  test('mouseenter will not render more possible locations when a square is selected', async () => {
    const user = userEvent.setup();

    render(component);

    const destroyerButton = screen.getByTestId('destroyer');
    await user.click(destroyerButton);

    const button45 = screen.getByTestId('45');
    const button35 = screen.getByTestId('35');

    await user.hover(button45);
    await user.click(button45);

    await user.hover(button35);

    const button36 = screen.getByTestId('36');
    const button36Style = getComputedStyle(button36);
    expect(button36Style.background).not.toContain(
      'url("destroyer1right.png")',
    );
    expect(button36Style.background).toContain('rgba(0, 0, 0, 0)');

    const button37 = screen.getByTestId('37');
    const button37Style = getComputedStyle(button37);
    expect(button36Style.background).not.toContain(
      'url("destroyer2right.png")',
    );
    expect(button37Style.background).toContain('rgba(0, 0, 0, 0)');

    const button34 = screen.getByTestId('34');
    const button34Style = getComputedStyle(button34);
    expect(button36Style.background).not.toContain('url("destroyer1left.png")');
    expect(button34Style.background).toContain('rgba(0, 0, 0, 0)');

    const button33 = screen.getByTestId('33');
    const button33Style = getComputedStyle(button33);
    expect(button36Style.background).not.toContain('url("destroyer0left.png")');
    expect(button33Style.background).toContain('rgba(0, 0, 0, 0)');

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer2up.png")');
    expect(button45Style.background).not.toContain('url("destroyer2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("destroyer1down.png")');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("destroyer2down.png")');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("destroyer1left.png")');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("destroyer0left.png")');

    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("destroyer1up.png")');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("destroyer0up.png")');
  });
});
