import { render, screen, within } from '@testing-library/react';
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
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
        hoverId={null}
      />,
    );

    const button = screen.getByTestId('1');
    const divImages = button.querySelector('div');

    expect(divImages).toBeNull();
  });

  it('will render a button with a ship image', async () => {
    player1.props.selectedShip = player1.props.allShips[0];
    render(
      <GameBoardButton
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
        hoverId={1}
      />,
    );

    const button = screen.getByTestId('1');
    const shipDiv_1 = within(button).getByTestId('down');

    expect(shipDiv_1).toBeInTheDocument();
    expect(shipDiv_1).toHaveClass('down');
    expect(shipDiv_1).toHaveClass('board-carrier');
  });

  it('will render a button with a hit image', () => {
    player1.board[1].isHit = true;

    render(
      <GameBoardButton
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
        hoverId={null}
      />,
    );

    const button = screen.getByTestId('1');
    const hitDiv = within(button).getByTestId('hit');

    expect(hitDiv).toBeInTheDocument();
  });

  it('will render a button with a miss image', () => {
    player1.board[1].isMiss = true;

    render(
      <GameBoardButton
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
        hoverId={null}
      />,
    );

    const button = screen.getByTestId('1');
    const missDiv = within(button).getByTestId('miss');

    expect(missDiv).toBeInTheDocument();
  });
});
