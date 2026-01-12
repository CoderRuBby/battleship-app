import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameBoardComponent } from '~/components/GameBoardComponent';
import type { gameBoardInterface } from '~/utils/GameBoard';
import gameBoard from '~/utils/GameBoard';
import type { shipInterface } from '~/utils/Ship';
import ship from '~/utils/Ship';

describe('GameBoardComponent', () => {
  let playerGameBoard: gameBoardInterface;
  let shipObject: shipInterface;
  let component: React.ReactElement;

  beforeEach(() => {
    shipObject = ship('foo', 3);
    playerGameBoard = gameBoard([shipObject]);
    component = (
      <GameBoardComponent
        board={playerGameBoard}
        handleOnClick={() => {}}
        handleMouseEnter={() => {}}
        handleMouseLeave={() => {}}
        label='button container'
      />
    );
  });
  it('can render a container with 100 GameBoardButtons', () => {
    render(component);

    const buttonCount = screen.getAllByRole('button').length;
    expect(buttonCount).toBe(100);
  });
});
