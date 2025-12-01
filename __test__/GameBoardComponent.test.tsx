import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { GameBoardComponent } from '~/components/GameBoardComponent';
import { gameBoard, type gameBoardInterface } from '~/utils/GameBoard';
import { ship } from '~/utils/Ship';
import type { shipInterface } from '~/utils/Ship';

describe('GameBoardComponent', () => {
  let playerGameBoard: gameBoardInterface;
  let shipObject: shipInterface;
  let component: React.ReactElement;

  beforeEach(() => {
    shipObject = ship('foo', 3);
    playerGameBoard = gameBoard([shipObject]);
    component = (
      <GameBoardComponent
        selectedShip={null}
        playerGameBoard={playerGameBoard}
        handleMouseEnter={() => {}}
        handleMouseLeave={() => {}}
      />
    );
  });
  it('can render a container with 100 GameBoardButtons', () => {
    render(component);

    const buttonCount = screen.getAllByRole('button').length;
    expect(buttonCount).toBe(100);
  });

  test.skip('a ship can be selected and placed on the gameboard', async () => {
    const user = userEvent.setup();

    render(component);

    const destroyer = screen.getByTestId('destroyer');
    await user.click(destroyer);

    const destroyerStyle = getComputedStyle(destroyer);

    expect(destroyerStyle.background).toContain(
      'url("highlighteddestroyer.png")',
    );

    const button45 = screen.getByTestId('45');
    const button46 = screen.getByTestId('46');
    const button47 = screen.getByTestId('47');

    await user.hover(button45);
    await user.click(button45);
    await user.click(button47);
    screen.debug(button46);

    const button45Style = getComputedStyle(button45);
    const button46Style = getComputedStyle(button46);
    const button47Style = getComputedStyle(button47);

    expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');
    expect(button46Style.background).toContain('url("destroyer1right.png")');
    expect(button47Style.background).toContain('url("destroyer2right.png")');
  });
});
