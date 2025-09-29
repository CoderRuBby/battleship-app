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

    const buttonOne = screen.getByTestId('1');
    await user.hover(buttonOne);

    const buttonOneStyle = getComputedStyle(buttonOne);
    const buttonTwo = screen.getByTestId('2');
    const buttonTwoStyle = getComputedStyle(buttonTwo);
    const buttonThree = screen.getByTestId('3');
    const buttonThreeStyle = getComputedStyle(buttonThree);
    const buttonTen = screen.getByTestId('10');
    const buttonTenStyle = getComputedStyle(buttonTen);
    const buttonTwenty = screen.getByTestId('20');
    const buttonTwentyStyle = getComputedStyle(buttonTwenty);

    expect(buttonOneStyle.background).toContain('rgba(0, 0, 0, 0)');
    expect(buttonTwoStyle.background).toContain('url("foo2.png")');
    expect(buttonThreeStyle.background).toContain('url("foo3.png")');
    expect(buttonTenStyle.background).toContain('url("foo2.png")');
    expect(buttonTwentyStyle.background).toContain('url("foo3.png")');
  });
});
