import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, test } from 'vitest';
import type { shipInterface } from '~/utils/ship';
import ship from '~/utils/ship';
import { AppComponent } from '~/components/AppComponent';
import userEvent from '@testing-library/user-event';
import type { gameBoardInterface } from '~/utils/gameBoard';
import gameBoard from '~/utils/gameBoard';

describe('App', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let playerGameBoard: gameBoardInterface;
  let component: React.ReactElement;
  let aiCarrier: shipInterface;
  let aiDestroyer: shipInterface;
  let aiSubmarine: shipInterface;
  let aiBattleship: shipInterface;
  let aiCruiser: shipInterface;
  let aiShipsArray: shipInterface[];
  let aiGameBoard: gameBoardInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    playerGameBoard = gameBoard(shipsArray);
    aiCarrier = ship('carrier', 5);
    aiDestroyer = ship('destroyer', 3);
    aiSubmarine = ship('submarine', 3);
    aiBattleship = ship('battleship', 4);
    aiCruiser = ship('cruiser', 2);
    aiShipsArray = [
      aiCarrier,
      aiDestroyer,
      aiSubmarine,
      aiBattleship,
      aiCruiser,
    ];
    aiGameBoard = gameBoard(aiShipsArray);

    component = (
      <AppComponent
        allShips={shipsArray}
        gameBoard={playerGameBoard}
        ai={aiGameBoard}
      />
    );
  });

  it('can render 5 ship buttons and a gameboard', () => {
    render(component);

    const board = screen.getAllByRole('region', {
      name: 'The Game Board',
    })[0];
    const carrierButton = screen.getByTestId('carrier');
    const destroyerButton = screen.getByTestId('destroyer');
    const submarineButton = screen.getByTestId('submarine');
    const battleshipButton = screen.getByTestId('battleship');
    const cruiserButton = screen.getByTestId('cruiser');

    expect(board).toBeInTheDocument();
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

    const playerBoard = screen.getByRole('region', { name: 'The Game Board' });

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer1up.png")');
    expect(button45Style.background).not.toContain('url("destroyer1left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = within(playerBoard).getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = within(playerBoard).getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button55 = within(playerBoard).getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("destroyer1down.png")');

    const button65 = within(playerBoard).getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("destroyer2down.png")');

    const button44 = within(playerBoard).getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("destroyer1left.png")');

    const button43 = within(playerBoard).getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("destroyer0left.png")');

    const button35 = within(playerBoard).getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("destroyer1up.png")');

    const button25 = within(playerBoard).getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("destroyer0up.png")');
  });

  test('mouseleave removes ship image on possible locations', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyerButton = screen.getByTestId('destroyer');
    await user.click(destroyerButton);

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.unhover(button45);

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer2up.png")');
    expect(button45Style.background).not.toContain('url("destroyer2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = within(playerBoard).getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).not.toContain(
      'url("destroyer1right.png")',
    );
    expect(button46Style.background).toContain('rgba(0, 0, 0, 0)');

    const button47 = within(playerBoard).getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).not.toContain(
      'url("destroyer2right.png")',
    );
    expect(button47Style.background).toContain('rgba(0, 0, 0, 0)');

    const button55 = within(playerBoard).getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).not.toContain('url("destroyer1down.png")');
    expect(button55Style.background).toContain('rgba(0, 0, 0, 0)');

    const button65 = within(playerBoard).getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).not.toContain('url("destroyer2down.png")');
    expect(button65Style.background).toContain('rgba(0, 0, 0, 0)');

    const button44 = within(playerBoard).getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).not.toContain('url("destroyer1left.png")');
    expect(button44Style.background).toContain('rgba(0, 0, 0, 0)');

    const button43 = within(playerBoard).getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).not.toContain('url("destroyer0left.png")');
    expect(button43Style.background).toContain('rgba(0, 0, 0, 0)');

    const button35 = within(playerBoard).getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).not.toContain('url("destroyer1up.png")');
    expect(button35Style.background).toContain('rgba(0, 0, 0, 0)');

    const button25 = within(playerBoard).getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).not.toContain('url("destroyer0up.png")');
    expect(button25Style.background).toContain('rgba(0, 0, 0, 0)');
  });

  test('mouseleave renders the selected ship image on possible locations when a square is selected', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyerButton = screen.getByTestId('destroyer');
    await user.click(destroyerButton);

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);

    await user.unhover(button45);

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer2up.png")');
    expect(button45Style.background).not.toContain('url("destroyer2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = within(playerBoard).getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = within(playerBoard).getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button55 = within(playerBoard).getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("destroyer1down.png")');

    const button65 = within(playerBoard).getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("destroyer2down.png")');

    const button44 = within(playerBoard).getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("destroyer1left.png")');

    const button43 = within(playerBoard).getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("destroyer0left.png")');

    const button35 = within(playerBoard).getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("destroyer1up.png")');

    const button25 = within(playerBoard).getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("destroyer0up.png")');
  });

  test('mouseenter will not render more possible locations when a square is selected', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyerButton = screen.getByTestId('destroyer');
    await user.click(destroyerButton);

    const button45 = within(playerBoard).getByTestId('45');
    const button35 = within(playerBoard).getByTestId('35');

    await user.hover(button45);
    await user.click(button45);

    await user.hover(button35);

    const button36 = within(playerBoard).getByTestId('36');
    const button36Style = getComputedStyle(button36);
    expect(button36Style.background).not.toContain(
      'url("destroyer1right.png")',
    );
    expect(button36Style.background).toContain('rgba(0, 0, 0, 0)');

    const button37 = within(playerBoard).getByTestId('37');
    const button37Style = getComputedStyle(button37);
    expect(button36Style.background).not.toContain(
      'url("destroyer2right.png")',
    );
    expect(button37Style.background).toContain('rgba(0, 0, 0, 0)');

    const button34 = within(playerBoard).getByTestId('34');
    const button34Style = getComputedStyle(button34);
    expect(button36Style.background).not.toContain('url("destroyer1left.png")');
    expect(button34Style.background).toContain('rgba(0, 0, 0, 0)');

    const button33 = within(playerBoard).getByTestId('33');
    const button33Style = getComputedStyle(button33);
    expect(button36Style.background).not.toContain('url("destroyer0left.png")');
    expect(button33Style.background).toContain('rgba(0, 0, 0, 0)');

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("destroyer2up.png")');
    expect(button45Style.background).not.toContain('url("destroyer2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = within(playerBoard).getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = within(playerBoard).getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button55 = within(playerBoard).getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("destroyer1down.png")');

    const button65 = within(playerBoard).getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("destroyer2down.png")');

    const button44 = within(playerBoard).getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("destroyer1left.png")');

    const button43 = within(playerBoard).getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("destroyer0left.png")');

    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("destroyer1up.png")');

    const button25 = within(playerBoard).getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("destroyer0up.png")');
  });

  test('verify user interface renders a placed ship on the gameboard', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const destroyerStyle = getComputedStyle(destroyer);

    expect(destroyerStyle.background).toContain(
      'url("highlighteddestroyer.png")',
    );

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = within(playerBoard).getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = within(playerBoard).getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("destroyer2right.png")');

    const button45Style = getComputedStyle(button45);

    expect(button45Style.background).toContain('url("destroyer0right.png")');
    const button25 = within(playerBoard).getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).not.toContain('url("destroyer0up.png")');
    expect(button25Style.background).toContain('rgba(0, 0, 0, 0)');
  });

  test('verify user interface renders all 5 placed ships on the gameboard', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const destroyerStyle = getComputedStyle(destroyer);

    expect(destroyerStyle.background).toContain(
      'url("highlighteddestroyer.png")',
    );

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = within(playerBoard).getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("destroyer1right.png")');

    const button47 = within(playerBoard).getByTestId('47');
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

    const button55 = within(playerBoard).getByTestId('55');
    await user.hover(button55);
    await user.click(button55);
    await user.unhover(button55);

    const button56 = within(playerBoard).getByTestId('56');
    await user.hover(button56);
    await user.unhover(button56);
    const button56Style = getComputedStyle(button56);
    expect(button56Style.background).toContain('url("carrier1right.png")');

    const button57 = within(playerBoard).getByTestId('57');
    await user.hover(button57);
    await user.unhover(button57);
    const button57Style = getComputedStyle(button57);
    expect(button57Style.background).toContain('url("carrier2right.png")');

    const button58 = within(playerBoard).getByTestId('58');
    await user.hover(button58);
    await user.unhover(button58);
    const button58Style = getComputedStyle(button58);
    expect(button58Style.background).toContain('url("carrier3right.png")');

    const button59 = within(playerBoard).getByTestId('59');
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

    const button0 = within(playerBoard).getByTestId('0');
    await user.hover(button0);
    await user.click(button0);
    await user.unhover(button0);

    const button10 = within(playerBoard).getByTestId('10');
    await user.hover(button10);
    await user.unhover(button10);
    const button10Style = getComputedStyle(button10);
    expect(button10Style.background).toContain('url("battleship1down.png")');

    const button20 = within(playerBoard).getByTestId('20');
    await user.hover(button20);
    await user.unhover(button20);
    const button20Style = getComputedStyle(button20);
    expect(button20Style.background).toContain('url("battleship2down.png")');

    const button30 = within(playerBoard).getByTestId('30');
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

    const button99 = within(playerBoard).getByTestId('99');
    await user.hover(button99);
    await user.click(button99);
    await user.unhover(button99);

    const button89 = within(playerBoard).getByTestId('89');
    await user.hover(button89);
    await user.unhover(button89);
    const button89Style = getComputedStyle(button89);
    expect(button89Style.background).toContain('url("submarine1up.png")');

    const button79 = within(playerBoard).getByTestId('79');
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

    const button9 = within(playerBoard).getByTestId('9');
    await user.hover(button9);
    await user.click(button9);
    await user.unhover(button9);

    const button8 = within(playerBoard).getByTestId('8');
    await user.hover(button8);
    await user.click(button8);
    await user.unhover(button8);
    const button8Style = getComputedStyle(button8);
    expect(button8Style.background).toContain('url("cruiser0left.png")');

    const button9Style = getComputedStyle(button9);

    expect(button9Style.background).toContain('url("cruiser1left.png")');
  });

  test('verify ai gameboard renders after all ships have been placed', async () => {
    const user = userEvent.setup();

    render(component);

    let aiBoard = screen.queryByRole('region', { name: 'Ai Game Board' });

    expect(aiBoard).not.toBeInTheDocument();

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = within(playerBoard).getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);

    const button47 = within(playerBoard).getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);

    const carrier = screen.getByTestId('carrier');
    await user.click(carrier);

    const button55 = within(playerBoard).getByTestId('55');
    await user.hover(button55);
    await user.click(button55);
    await user.unhover(button55);

    const button56 = within(playerBoard).getByTestId('56');
    await user.hover(button56);
    await user.unhover(button56);

    const button57 = within(playerBoard).getByTestId('57');
    await user.hover(button57);
    await user.unhover(button57);

    const button58 = within(playerBoard).getByTestId('58');
    await user.hover(button58);
    await user.unhover(button58);

    const button59 = within(playerBoard).getByTestId('59');
    await user.hover(button59);
    await user.click(button59);
    await user.unhover(button59);

    const battleship = screen.getByTestId('battleship');
    await user.click(battleship);

    const button0 = within(playerBoard).getByTestId('0');
    await user.hover(button0);
    await user.click(button0);
    await user.unhover(button0);

    const button10 = within(playerBoard).getByTestId('10');
    await user.hover(button10);
    await user.unhover(button10);

    const button20 = within(playerBoard).getByTestId('20');
    await user.hover(button20);
    await user.unhover(button20);

    const button30 = within(playerBoard).getByTestId('30');
    await user.hover(button30);
    await user.click(button30);
    await user.unhover(button30);

    const submarine = screen.getByTestId('submarine');
    await user.click(submarine);

    const button99 = within(playerBoard).getByTestId('99');
    await user.hover(button99);
    await user.click(button99);
    await user.unhover(button99);

    const button89 = within(playerBoard).getByTestId('89');
    await user.hover(button89);
    await user.unhover(button89);

    const button79 = within(playerBoard).getByTestId('79');
    await user.hover(button79);
    await user.click(button79);
    await user.unhover(button79);

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const button9 = within(playerBoard).getByTestId('9');
    await user.hover(button9);
    await user.click(button9);
    await user.unhover(button9);

    const button8 = within(playerBoard).getByTestId('8');
    await user.hover(button8);
    await user.click(button8);
    await user.unhover(button8);

    aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });

    expect(aiBoard).toBeInTheDocument();
  });

  test('verify ship buttons are not rendered after all ships have been placed', async () => {
    const user = userEvent.setup();

    render(component);

    const shipContainer = screen.getByRole('region', {
      name: 'The ship buttons',
    });

    expect(shipContainer).toBeInTheDocument();

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = within(playerBoard).getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);

    const button47 = within(playerBoard).getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);

    const carrier = screen.getByTestId('carrier');
    await user.click(carrier);

    const button55 = within(playerBoard).getByTestId('55');
    await user.hover(button55);
    await user.click(button55);
    await user.unhover(button55);

    const button56 = within(playerBoard).getByTestId('56');
    await user.hover(button56);
    await user.unhover(button56);

    const button57 = within(playerBoard).getByTestId('57');
    await user.hover(button57);
    await user.unhover(button57);

    const button58 = within(playerBoard).getByTestId('58');
    await user.hover(button58);
    await user.unhover(button58);

    const button59 = within(playerBoard).getByTestId('59');
    await user.hover(button59);
    await user.click(button59);
    await user.unhover(button59);

    const battleship = screen.getByTestId('battleship');
    await user.click(battleship);

    const button0 = within(playerBoard).getByTestId('0');
    await user.hover(button0);
    await user.click(button0);
    await user.unhover(button0);

    const button10 = within(playerBoard).getByTestId('10');
    await user.hover(button10);
    await user.unhover(button10);

    const button20 = within(playerBoard).getByTestId('20');
    await user.hover(button20);
    await user.unhover(button20);

    const button30 = within(playerBoard).getByTestId('30');
    await user.hover(button30);
    await user.click(button30);
    await user.unhover(button30);

    const submarine = screen.getByTestId('submarine');
    await user.click(submarine);

    const button99 = within(playerBoard).getByTestId('99');
    await user.hover(button99);
    await user.click(button99);
    await user.unhover(button99);

    const button89 = within(playerBoard).getByTestId('89');
    await user.hover(button89);
    await user.unhover(button89);

    const button79 = within(playerBoard).getByTestId('79');
    await user.hover(button79);
    await user.click(button79);
    await user.unhover(button79);

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const button9 = within(playerBoard).getByTestId('9');
    await user.hover(button9);
    await user.click(button9);
    await user.unhover(button9);

    const button8 = within(playerBoard).getByTestId('8');
    await user.hover(button8);
    await user.click(button8);
    await user.unhover(button8);

    const noShipContainer = screen.queryByRole('region', {
      name: 'The ship buttons',
    });

    expect(noShipContainer).not.toBeInTheDocument();
  });

  test('verify ai can place all ships', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = within(playerBoard).getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);

    const button47 = within(playerBoard).getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);

    const carrier = screen.getByTestId('carrier');
    await user.click(carrier);

    const button55 = within(playerBoard).getByTestId('55');
    await user.hover(button55);
    await user.click(button55);
    await user.unhover(button55);

    const button56 = within(playerBoard).getByTestId('56');
    await user.hover(button56);
    await user.unhover(button56);

    const button57 = within(playerBoard).getByTestId('57');
    await user.hover(button57);
    await user.unhover(button57);

    const button58 = within(playerBoard).getByTestId('58');
    await user.hover(button58);
    await user.unhover(button58);

    const button59 = within(playerBoard).getByTestId('59');
    await user.hover(button59);
    await user.click(button59);
    await user.unhover(button59);

    const battleship = screen.getByTestId('battleship');
    await user.click(battleship);

    const button0 = within(playerBoard).getByTestId('0');
    await user.hover(button0);
    await user.click(button0);
    await user.unhover(button0);

    const button10 = within(playerBoard).getByTestId('10');
    await user.hover(button10);
    await user.unhover(button10);

    const button20 = within(playerBoard).getByTestId('20');
    await user.hover(button20);
    await user.unhover(button20);

    const button30 = within(playerBoard).getByTestId('30');
    await user.hover(button30);
    await user.click(button30);
    await user.unhover(button30);

    const submarine = screen.getByTestId('submarine');
    await user.click(submarine);

    const button99 = within(playerBoard).getByTestId('99');
    await user.hover(button99);
    await user.click(button99);
    await user.unhover(button99);

    const button89 = within(playerBoard).getByTestId('89');
    await user.hover(button89);
    await user.unhover(button89);

    const button79 = within(playerBoard).getByTestId('79');
    await user.hover(button79);
    await user.click(button79);
    await user.unhover(button79);

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const button9 = within(playerBoard).getByTestId('9');
    await user.hover(button9);
    await user.click(button9);
    await user.unhover(button9);

    const button8 = within(playerBoard).getByTestId('8');
    await user.hover(button8);
    await user.click(button8);
    await user.unhover(button8);

    expect(aiGameBoard.props.allShipsPlaced).toBe(true);
  });

  test('verify the player can attack', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = within(playerBoard).getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);

    const button47 = within(playerBoard).getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);

    const carrier = screen.getByTestId('carrier');
    await user.click(carrier);

    const button55 = within(playerBoard).getByTestId('55');
    await user.hover(button55);
    await user.click(button55);
    await user.unhover(button55);

    const button56 = within(playerBoard).getByTestId('56');
    await user.hover(button56);
    await user.unhover(button56);

    const button57 = within(playerBoard).getByTestId('57');
    await user.hover(button57);
    await user.unhover(button57);

    const button58 = within(playerBoard).getByTestId('58');
    await user.hover(button58);
    await user.unhover(button58);

    const button59 = within(playerBoard).getByTestId('59');
    await user.hover(button59);
    await user.click(button59);
    await user.unhover(button59);

    const battleship = screen.getByTestId('battleship');
    await user.click(battleship);

    const button0 = within(playerBoard).getByTestId('0');
    await user.hover(button0);
    await user.click(button0);
    await user.unhover(button0);

    const button10 = within(playerBoard).getByTestId('10');
    await user.hover(button10);
    await user.unhover(button10);

    const button20 = within(playerBoard).getByTestId('20');
    await user.hover(button20);
    await user.unhover(button20);

    const button30 = within(playerBoard).getByTestId('30');
    await user.hover(button30);
    await user.click(button30);
    await user.unhover(button30);

    const submarine = screen.getByTestId('submarine');
    await user.click(submarine);

    const button99 = within(playerBoard).getByTestId('99');
    await user.hover(button99);
    await user.click(button99);
    await user.unhover(button99);

    const button89 = within(playerBoard).getByTestId('89');
    await user.hover(button89);
    await user.unhover(button89);

    const button79 = within(playerBoard).getByTestId('79');
    await user.hover(button79);
    await user.click(button79);
    await user.unhover(button79);

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const button9 = within(playerBoard).getByTestId('9');
    await user.hover(button9);
    await user.click(button9);
    await user.unhover(button9);

    const button8 = within(playerBoard).getByTestId('8');
    await user.hover(button8);
    await user.click(button8);
    await user.unhover(button8);

    const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
    const button23 = within(aiBoard).getByTestId('23');
    await user.click(button23);

    expect(aiGameBoard.board[23].isHit || aiGameBoard.board[23].isMiss).toBe(
      true,
    );
  });

  test('verify ai can attack', async () => {
    const user = userEvent.setup();

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const button45 = within(playerBoard).getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    await user.unhover(button45);

    const button46 = within(playerBoard).getByTestId('46');
    await user.hover(button46);
    await user.unhover(button46);

    const button47 = within(playerBoard).getByTestId('47');
    await user.hover(button47);
    await user.click(button47);
    await user.unhover(button47);

    const carrier = screen.getByTestId('carrier');
    await user.click(carrier);

    const button55 = within(playerBoard).getByTestId('55');
    await user.hover(button55);
    await user.click(button55);
    await user.unhover(button55);

    const button56 = within(playerBoard).getByTestId('56');
    await user.hover(button56);
    await user.unhover(button56);

    const button57 = within(playerBoard).getByTestId('57');
    await user.hover(button57);
    await user.unhover(button57);

    const button58 = within(playerBoard).getByTestId('58');
    await user.hover(button58);
    await user.unhover(button58);

    const button59 = within(playerBoard).getByTestId('59');
    await user.hover(button59);
    await user.click(button59);
    await user.unhover(button59);

    const battleship = screen.getByTestId('battleship');
    await user.click(battleship);

    const button0 = within(playerBoard).getByTestId('0');
    await user.hover(button0);
    await user.click(button0);
    await user.unhover(button0);

    const button10 = within(playerBoard).getByTestId('10');
    await user.hover(button10);
    await user.unhover(button10);

    const button20 = within(playerBoard).getByTestId('20');
    await user.hover(button20);
    await user.unhover(button20);

    const button30 = within(playerBoard).getByTestId('30');
    await user.hover(button30);
    await user.click(button30);
    await user.unhover(button30);

    const submarine = screen.getByTestId('submarine');
    await user.click(submarine);

    const button99 = within(playerBoard).getByTestId('99');
    await user.hover(button99);
    await user.click(button99);
    await user.unhover(button99);

    const button89 = within(playerBoard).getByTestId('89');
    await user.hover(button89);
    await user.unhover(button89);

    const button79 = within(playerBoard).getByTestId('79');
    await user.hover(button79);
    await user.click(button79);
    await user.unhover(button79);

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const button9 = within(playerBoard).getByTestId('9');
    await user.hover(button9);
    await user.click(button9);
    await user.unhover(button9);

    const button8 = within(playerBoard).getByTestId('8');
    await user.hover(button8);
    await user.click(button8);
    await user.unhover(button8);

    const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
    const button23 = within(aiBoard).getByTestId('23');
    await user.click(button23);

    const isHitOrMiss = playerGameBoard.board.some(
      (board) => board.isHit === true || board.isMiss === true,
    );
    expect(isHitOrMiss).toBe(true);
  });

  test('verify a hit renders on the ai gameboard', async () => {
    const user = userEvent.setup();
    aiGameBoard.board[23].ship = aiGameBoard.props.allShips[0];
    aiGameBoard.props.allShipsPlaced = true;
    playerGameBoard.props.allShipsPlaced = true;

    render(component);

    const aiBoard = screen.getByRole('region', {
      name: 'Ai Game Board',
    });
    const button23 = within(aiBoard).getByTestId('23');
    await user.click(button23);
    const button23Style = getComputedStyle(button23);

    expect(button23Style.background).toContain('url("hit.png")');
  });

  test('verify a miss will render on the ai game board', async () => {
    const user = userEvent.setup();
    aiGameBoard.props.allShipsPlaced = true;
    playerGameBoard.props.allShipsPlaced = true;

    render(component);

    const aiBoard = screen.getByRole('region', {
      name: 'Ai Game Board',
    });
    const button23 = within(aiBoard).getByTestId('23');
    await user.click(button23);
    const button23Style = getComputedStyle(button23);

    expect(button23Style.background).toContain('url("miss.png")');
  });

  test('verify a hit will render on the player game board', async () => {
    const user = userEvent.setup();
    aiGameBoard.props.allShipsPlaced = true;
    playerGameBoard.props.allShipsPlaced = true;
    playerGameBoard.board.forEach((square) => {
      square.ship = playerGameBoard.props.allShips[0];
    });

    render(component);

    const aiBoard = screen.getByRole('region', {
      name: 'Ai Game Board',
    });
    const button23 = within(aiBoard).getByTestId('23');
    await user.click(button23);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });
    const boardButtons = within(playerBoard).getAllByRole('button', {
      name: '',
    });

    const foundHit = boardButtons.some((button) => {
      const buttonStyle = getComputedStyle(button);
      return buttonStyle.background.includes('hit.png');
    });

    expect(foundHit).toBe(true);
  });

  test('verify a miss will render on the player game board', async () => {
    const user = userEvent.setup();
    aiGameBoard.props.allShipsPlaced = true;
    playerGameBoard.props.allShipsPlaced = true;

    render(component);

    const aiBoard = screen.getByRole('region', {
      name: 'Ai Game Board',
    });
    const button23 = within(aiBoard).getByTestId('23');
    await user.click(button23);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const boardButtons = within(playerBoard).getAllByRole('button', {
      name: '',
    });

    const foundMiss = boardButtons.some((button) => {
      const buttonStyle = getComputedStyle(button);
      return buttonStyle.background.includes('miss.png');
    });

    expect(foundMiss).toBe(true);
  });

  test('verify game over menu renders with you win', async () => {
    const user = userEvent.setup();
    playerGameBoard.props.allShipsPlaced = true;
    aiGameBoard.props.allShipsPlaced = true;
    aiGameBoard.props.allShips[0].props.sunk = true;
    aiGameBoard.props.allShips[1].props.sunk = true;
    aiGameBoard.props.allShips[2].props.sunk = true;
    aiGameBoard.props.allShips[3].props.sunk = true;
    aiGameBoard.board[53].ship = aiGameBoard.props.allShips[4];
    aiGameBoard.board[54].ship = aiGameBoard.props.allShips[4];

    render(component);

    const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
    const aiButton54 = within(aiBoard).getByTestId('54');
    await user.click(aiButton54);
    const aiButton53 = within(aiBoard).getByTestId('53');
    await user.click(aiButton53);

    const gameOverMenu = screen.getByRole('dialog');
    const gameOverText = within(gameOverMenu).getByRole('heading', {
      name: 'You Win',
    });

    expect(gameOverText).toBeInTheDocument();
  });

  test('verify game over menu renders with you lose', async () => {
    const user = userEvent.setup();
    playerGameBoard.props.allShips[0].props.isPlaced = true;
    playerGameBoard.props.allShips[1].props.isPlaced = true;
    playerGameBoard.props.allShips[2].props.isPlaced = true;
    playerGameBoard.props.allShips[3].props.isPlaced = true;
    playerGameBoard.props.allShips[0].props.sunk = true;
    playerGameBoard.props.allShips[1].props.sunk = true;
    playerGameBoard.props.allShips[2].props.sunk = true;
    playerGameBoard.props.allShips[3].props.sunk = true;
    const string45 = '45';
    const string46 = '46';
    playerGameBoard.board.forEach((square) => {
      if (square.id !== Number(string45) && square.id !== Number(string46)) {
        playerGameBoard.board[square.id].isMiss = true;
      }
    });

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const button45 = within(playerBoard).getByTestId(string45);
    await user.click(button45);

    const button46 = within(playerBoard).getByTestId(string46);
    await user.click(button46);

    const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
    const aiButton54 = within(aiBoard).getByTestId('54');
    await user.click(aiButton54);
    const aiButton53 = within(aiBoard).getByTestId('53');
    await user.click(aiButton53);

    const gameOverMenu = screen.getByRole('dialog');
    const gameOverText = within(gameOverMenu).getByRole('heading', {
      name: 'You Lose',
    });

    expect(gameOverText).toBeInTheDocument();
  });

  test('verify play again button allows another game to be played', async () => {
    const user = userEvent.setup();
    playerGameBoard.props.allShips[0].props.isPlaced = true;
    playerGameBoard.props.allShips[1].props.isPlaced = true;
    playerGameBoard.props.allShips[2].props.isPlaced = true;
    playerGameBoard.props.allShips[3].props.isPlaced = true;
    playerGameBoard.props.allShips[0].props.sunk = true;
    playerGameBoard.props.allShips[1].props.sunk = true;
    playerGameBoard.props.allShips[2].props.sunk = true;
    playerGameBoard.props.allShips[3].props.sunk = true;
    const string45 = '45';
    const string46 = '46';
    playerGameBoard.board.forEach((square) => {
      if (square.id !== Number(string45) && square.id !== Number(string46)) {
        playerGameBoard.board[square.id].isMiss = true;
      }
    });

    render(component);

    const playerBoard = screen.getByRole('region', {
      name: 'The Game Board',
    });

    const cruiser = screen.getByTestId('cruiser');
    await user.click(cruiser);

    const button45 = within(playerBoard).getByTestId(string45);
    await user.click(button45);

    const button46 = within(playerBoard).getByTestId(string46);
    await user.click(button46);

    const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
    const aiButton54 = within(aiBoard).getByTestId('54');
    await user.click(aiButton54);
    const aiButton53 = within(aiBoard).getByTestId('53');
    await user.click(aiButton53);

    const gameOverMenu = screen.getByRole('dialog');
    const playAgainButton = within(gameOverMenu).getByRole('button', {
      name: 'Play Again',
    });

    await user.click(playAgainButton);

    const shipsContainer = screen.getByRole('region', {
      name: 'The ship buttons',
    });
    const boardButtons = within(playerBoard).getAllByRole('button', {
      name: '',
    });

    expect(shipsContainer).toBeInTheDocument();
    expect(aiBoard).not.toBeInTheDocument();
    boardButtons.forEach((button) => {
      const buttonStyle = getComputedStyle(button);
      expect(buttonStyle.background).toEqual('rgba(0, 0, 0, 0)');
    });
  });
});
