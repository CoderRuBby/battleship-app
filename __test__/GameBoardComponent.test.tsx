import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameBoardComponent } from '~/components/GameBoardComponent';
import { gameBoard } from '~/utils/GameBoard';
import type { gameBoardInterface } from '~/utils/GameBoard';

describe('GameBoardComponent', () => {
  let gameBoardObject: gameBoardInterface;
  let component: React.ReactElement;

  beforeEach(() => {
    gameBoardObject = { board: gameBoard().board };
    component = <GameBoardComponent gameBoard={gameBoardObject} />;
  });
  it('can render a container with 100 GameBoardButtons', () => {
    render(component);

    const buttonCount = screen.getAllByRole('button').length;
    expect(buttonCount).toBe(100);
  });
});
