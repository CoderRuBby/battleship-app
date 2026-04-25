import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameBoardButton } from '~/components/GameBoardButton';
import { createPlayer1 } from './testData';

describe('GameBoardButton', () => {
  let player1: ReturnType<typeof createPlayer1>;

  beforeEach(() => {
    player1 = createPlayer1();
  });

  it('will render a default button', () => {
    render(
      <GameBoardButton
        testId='button'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
      />,
    );

    const button = screen.getByTestId('button');
    const buttonStyle = getComputedStyle(button);

    expect(buttonStyle.background).toContain('rgba(0, 0, 0, 0)');
  });

  it('will render a button with a ship image', async () => {
    player1.props.selectedShip = player1.props.allShips[0];
    player1.board[1].imageNumber = 1;
    player1.board[1].imageDirection = 'up';
    render(
      <GameBoardButton
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
      />,
    );

    const button = screen.getByTestId('1');
    const style = getComputedStyle(button);

    expect(style.background).toContain('carrier-1.png');
    expect(button).toHaveClass('up');
  });

  it('will render a button with a hit image', () => {
    player1.board[1].isHit = true;
    player1.props.selectedShip = player1.props.allShips[0];
    player1.board[1].imageNumber = 1;
    player1.board[1].imageDirection = 'up';
    render(
      <GameBoardButton
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
      />,
    );

    const button = screen.getByTestId('1');
    const style = getComputedStyle(button);

    expect(style.background).toContain('hit.png');
  });

  it('will render a button with a miss image', () => {
    player1.board[1].isMiss = true;
    player1.props.selectedShip = player1.props.allShips[0];
    player1.board[1].imageNumber = 1;
    player1.board[1].imageDirection = 'up';
    render(
      <GameBoardButton
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
      />,
    );

    const button = screen.getByTestId('1');
    const style = getComputedStyle(button);

    expect(style.background).toContain('miss.png');
  });
});
