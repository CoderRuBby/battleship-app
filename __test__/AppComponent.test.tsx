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

  test('verify user interface renders a placed ship on the gameboard', async () => {
    const user = userEvent.setup();

    render(component);

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const destroyerStyle = getComputedStyle(destroyer);

    expect(destroyerStyle.background).toContain(
      'url("highlighteddestroyer.png")',
    );

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = screen.getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = screen.getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button45Style = getComputedStyle(button45);

    expect(button45Style.background).toContain('url("destroyer0right.png")');
    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).not.toContain('url("destroyer0up.png")');
    expect(button25Style.background).toContain('rgba(0, 0, 0, 0)');
  });

  test('verify user interface renders all 5 placed ships on the gameboard', async () => {
    const user = userEvent.setup();

    render(component);

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const destroyerStyle = getComputedStyle(destroyer);

    expect(destroyerStyle.background).toContain(
      'url("highlighteddestroyer.png")',
    );

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = screen.getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = screen.getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button45Style = getComputedStyle(button45);

    expect(button45Style.background).toContain('url("destroyer0right.png")');

    const carrier = screen.getByTestId('carrier');
    await user.click(carrier);

    const carrierStyle = getComputedStyle(carrier);

    expect(carrierStyle.background).toContain('url("highlightedcarrier.png")');

    const button55 = screen.getByTestId('55');
    await user.hover(button55);
    await user.click(button55);
    await user.unhover(button55);

    const button56 = screen.getByTestId('56');
    await user.hover(button56);
    await user.unhover(button56);
    const button56Style = getComputedStyle(button56);
    expect(button56Style.background).toContain('url("carrier1right.png")');

    const button57 = screen.getByTestId('57');
    await user.hover(button57);
    await user.unhover(button57);
    const button57Style = getComputedStyle(button57);
    expect(button57Style.background).toContain('url("carrier2right.png")');

    const button58 = screen.getByTestId('58');
    await user.hover(button58);
    await user.unhover(button58);
    const button58Style = getComputedStyle(button58);
    expect(button58Style.background).toContain('url("carrier3right.png")');

    const button59 = screen.getByTestId('59');
    await user.hover(button59);
    await user.click(button59);
    await user.unhover(button59);
    const button59Style = getComputedStyle(button59);
    expect(button59Style.background).toContain('url("carrier4right.png")');

    const button55Style = getComputedStyle(button55);

    expect(button55Style.background).toContain('url("carrier0right.png")');

    const battleship = screen.getByTestId('battleship');
    await user.click(battleship);
    const battleshipStyle = getComputedStyle(battleship);

    expect(battleshipStyle.background).toContain(
      'url("highlightedbattleship.png")',
    );

    const button0 = screen.getByTestId('0');
    await user.hover(button0);
    await user.click(button0);
    await user.unhover(button0);

    const button10 = screen.getByTestId('10');
    await user.hover(button10);
    await user.unhover(button10);
    const button10Style = getComputedStyle(button10);
    expect(button10Style.background).toContain('url("battleship1down.png")');

    const button20 = screen.getByTestId('20');
    await user.hover(button20);
    await user.unhover(button20);
    const button20Style = getComputedStyle(button20);
    expect(button20Style.background).toContain('url("battleship2down.png")');

    const button30 = screen.getByTestId('30');
    await user.hover(button30);
    await user.click(button30);
    await user.unhover(button30);
    const button30Style = getComputedStyle(button30);
    expect(button30Style.background).toContain('url("battleship3down.png")');

    const button0Style = getComputedStyle(button0);

    expect(button0Style.background).toContain('url("battleship0down.png")');

    const submarine = screen.getByTestId('submarine');
    await user.click(submarine);

    const submarineStyle = getComputedStyle(submarine);

    expect(submarineStyle.background).toContain(
      'url("highlightedsubmarine.png")',
    );

    const button99 = screen.getByTestId('99');
    await user.hover(button99);
    await user.click(button99);
    await user.unhover(button99);

    const button89 = screen.getByTestId('89');
    await user.hover(button89);
    await user.unhover(button89);
    const button89Style = getComputedStyle(button89);
    expect(button89Style.background).toContain('url("submarine1up.png")');

    const button79 = screen.getByTestId('79');
    await user.hover(button79);
    await user.click(button79);
    await user.unhover(button79);
    const button79Style = getComputedStyle(button79);
    expect(button79Style.background).toContain('url("submarine0up.png")');

    const button99Style = getComputedStyle(button99);

    expect(button99Style.background).toContain('url("submarine2up.png")');

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const cruiserStyle = getComputedStyle(cruiser);

    expect(cruiserStyle.background).toContain('url("highlightedcruiser.png")');

    const button9 = screen.getByTestId('9');
    await user.hover(button9);
    await user.click(button9);
    await user.unhover(button9);

    const button8 = screen.getByTestId('8');
    await user.hover(button8);
    await user.click(button8);
    await user.unhover(button8);
    const button8Style = getComputedStyle(button8);
    expect(button8Style.background).toContain('url("cruiser0left.png")');

    const button9Style = getComputedStyle(button9);

    expect(button9Style.background).toContain('url("cruiser1left.png")');
  });
});
