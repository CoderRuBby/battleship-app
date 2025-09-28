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

  beforeEach(() => {
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

  test('on mouse enter renders a ship image on the button', async () => {
    const user = userEvent.setup();

    render(componentWithSelectedShip);

    const button = screen.getByTestId('1');
    await user.hover(button);

    const style = getComputedStyle(button);

    expect(style.background).toContain();
  });
});
