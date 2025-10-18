import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { GameBoardComponent } from '~/components/GameBoardComponent';
import { ship } from '~/utils/Ship';
import type { shipInterface } from '~/utils/Ship';

describe('GameBoardComponent', () => {
  let shipObject: shipInterface;
  let component: React.ReactElement;
  let componentWithSelectedShip: React.ReactElement;

  beforeEach(() => {
    shipObject = ship('foo', 3);
    component = (
      <GameBoardComponent allShips={[shipObject]} selectedShip={null} />
    );
    componentWithSelectedShip = (
      <GameBoardComponent allShips={[shipObject]} selectedShip={shipObject} />
    );
  });
  it('can render a container with 100 GameBoardButtons', () => {
    render(component);

    const buttonCount = screen.getAllByRole('button').length;
    expect(buttonCount).toBe(100);
  });

  test('mouseenter renders the selected ship image on possible locations', async () => {
    const user = userEvent.setup();

    render(componentWithSelectedShip);

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("foo2up.png")');
    expect(button45Style.background).not.toContain('url("foo2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("foo1right.png")');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("foo2right.png")');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("foo1down.png")');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("foo2down.png")');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("foo1left.png")');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("foo0left.png")');

    const button35 = screen.getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("foo1up.png")');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("foo0up.png")');
  });

  test('mouseleave removes ship image on possible locations', async () => {
    const user = userEvent.setup();

    render(componentWithSelectedShip);

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    await user.unhover(button45);

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("foo2up.png")');
    expect(button45Style.background).not.toContain('url("foo2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).not.toContain('url("foo1right.png")');
    expect(button46Style.background).toContain('rgba(0, 0, 0, 0)');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).not.toContain('url("foo2right.png")');
    expect(button47Style.background).toContain('rgba(0, 0, 0, 0)');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).not.toContain('url("foo1down.png")');
    expect(button55Style.background).toContain('rgba(0, 0, 0, 0)');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).not.toContain('url("foo2down.png")');
    expect(button65Style.background).toContain('rgba(0, 0, 0, 0)');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).not.toContain('url("foo1left.png")');
    expect(button44Style.background).toContain('rgba(0, 0, 0, 0)');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).not.toContain('url("foo0left.png")');
    expect(button43Style.background).toContain('rgba(0, 0, 0, 0)');

    const button35 = screen.getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).not.toContain('url("foo1up.png")');
    expect(button35Style.background).toContain('rgba(0, 0, 0, 0)');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).not.toContain('url("foo0up.png")');
    expect(button25Style.background).toContain('rgba(0, 0, 0, 0)');
  });

  test('mouseleave renders the selected ship image on possible locations when a square is selected', async () => {
    const user = userEvent.setup();

    render(componentWithSelectedShip);

    const button45 = screen.getByTestId('45');
    await user.hover(button45);
    await user.click(button45);
    shipObject.addShipStart(45);

    await user.unhover(button45);

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("foo2up.png")');
    expect(button45Style.background).not.toContain('url("foo2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("foo1right.png")');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("foo2right.png")');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("foo1down.png")');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("foo2down.png")');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("foo1left.png")');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("foo0left.png")');

    const button35 = screen.getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("foo1up.png")');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("foo0up.png")');
  });

  test('mouseenter will not render more possible locations when a square is selected', async () => {
    const user = userEvent.setup();

    render(componentWithSelectedShip);

    const button45 = screen.getByTestId('45');
    const button35 = screen.getByTestId('35');

    await user.hover(button45);
    await user.click(button45);
    shipObject.addShipStart(45);

    await user.hover(button35);

    const button36 = screen.getByTestId('36');
    const button36Style = getComputedStyle(button36);
    expect(button36Style.background).not.toContain('url("foo1right.png")');
    expect(button36Style.background).toContain('rgba(0, 0, 0, 0)');

    const button37 = screen.getByTestId('37');
    const button37Style = getComputedStyle(button37);
    expect(button36Style.background).not.toContain('url("foo2right.png")');
    expect(button37Style.background).toContain('rgba(0, 0, 0, 0)');

    const button34 = screen.getByTestId('34');
    const button34Style = getComputedStyle(button34);
    expect(button36Style.background).not.toContain('url("foo1left.png")');
    expect(button34Style.background).toContain('rgba(0, 0, 0, 0)');

    const button33 = screen.getByTestId('33');
    const button33Style = getComputedStyle(button33);
    expect(button36Style.background).not.toContain('url("foo0left.png")');
    expect(button33Style.background).toContain('rgba(0, 0, 0, 0)');

    const button45Style = getComputedStyle(button45);
    expect(button45Style.background).not.toContain('url("foo2up.png")');
    expect(button45Style.background).not.toContain('url("foo2left.png")');
    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

    const button46 = screen.getByTestId('46');
    const button46Style = getComputedStyle(button46);
    expect(button46Style.background).toContain('url("foo1right.png")');

    const button47 = screen.getByTestId('47');
    const button47Style = getComputedStyle(button47);
    expect(button47Style.background).toContain('url("foo2right.png")');

    const button55 = screen.getByTestId('55');
    const button55Style = getComputedStyle(button55);
    expect(button55Style.background).toContain('url("foo1down.png")');

    const button65 = screen.getByTestId('65');
    const button65Style = getComputedStyle(button65);
    expect(button65Style.background).toContain('url("foo2down.png")');

    const button44 = screen.getByTestId('44');
    const button44Style = getComputedStyle(button44);
    expect(button44Style.background).toContain('url("foo1left.png")');

    const button43 = screen.getByTestId('43');
    const button43Style = getComputedStyle(button43);
    expect(button43Style.background).toContain('url("foo0left.png")');

    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("foo1up.png")');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("foo0up.png")');
  });
});
