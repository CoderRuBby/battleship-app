import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameBoardComponent } from '~/components/GameBoardComponent';
import { createPlayer1 } from './testData';

describe('GameBoardComponent', () => {
  let player1: ReturnType<typeof createPlayer1>;
  let component: React.ReactElement;

  beforeEach(() => {
    player1 = createPlayer1();
    component = (
      <GameBoardComponent
        player={player1}
        handleOnClick={() => {}}
        handleMouseEnter={() => {}}
        handleMouseLeave={() => {}}
        label='button container'
        dblClick={() => {}}
      />
    );
  });
  it('can render a container with 100 GameBoardButtons', () => {
    render(component);

    const buttonCount = screen.getAllByRole('button').length;
    expect(buttonCount).toBe(100);
  });
});
