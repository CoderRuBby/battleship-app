import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { GameBoardComponent } from '~/components/GameBoardComponent';
import { gameBoard } from '~/utils/GameBoard';
import type { gameBoardInterface } from '~/utils/GameBoard';
import { ship } from '~/utils/Ship';
import type { shipInterface } from '~/utils/Ship';

describe('GameBoardComponent', () => {
  let shipObject: shipInterface;
  let gameBoardObject: gameBoardInterface;
  let component: React.ReactElement;
  let componentWithSelectedShip: React.ReactElement;

  beforeEach(() => {
    shipObject = ship('foo', 3);
    shipObject = ship('foo', 3);
    gameBoardObject = { board: gameBoard().board };
    component = (
      <GameBoardComponent gameBoard={gameBoardObject} selectedShip={null} />
    );
    componentWithSelectedShip = (
      <GameBoardComponent
        gameBoard={gameBoardObject}
        selectedShip={shipObject}
      />
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
    expect(button43Style.background).toContain('url("foo2left.png")');

    const button35 = screen.getByTestId('35');
    const button35Style = getComputedStyle(button35);
    expect(button35Style.background).toContain('url("foo1up.png")');

    const button25 = screen.getByTestId('25');
    const button25Style = getComputedStyle(button25);
    expect(button25Style.background).toContain('url("foo2up.png")');
  });
});
