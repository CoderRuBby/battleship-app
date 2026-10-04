import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameBoardButton } from '~/components/GameBoardButton';
import { createPlayer1 } from './testData';

describe('GameBoardButton', () => {
  let player1: ReturnType<typeof createPlayer1>;
  let component: React.ReactElement;

  beforeEach(() => {
    player1 = createPlayer1();
    component = (
      <GameBoardButton
        testId='1'
        player={player1}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
        dblClick={() => {}}
        hoverId={null}
      />
    );
  });

  it('will render a default button', () => {
    render(component);

    const button = screen.getByTestId('1');
    const divImages = button.querySelector('div');

    expect(divImages).toBeNull();
  });

  it('will render a placed ship', async () => {
    const ship = player1.props.allShips[0];
    const square1 = 1;
    const square2 = 2;
    const square3 = 3;
    const square4 = 4;
    const square5 = 5;

    player1.props.allShips[0].props.isPlaced = true;
    player1.board[square1].ship = ship;
    player1.board[square2].ship = ship;
    player1.board[square3].ship = ship;
    player1.board[square4].ship = ship;
    player1.board[square5].ship = ship;
    player1.props.allShips[0].props.shipStartPoint = square1;
    player1.props.allShips[0].props.shipEndPoint = square5;
    player1.props.allShips[0].props.direction = 'right';
    player1.props.allShips[0].props.placedLocations = [
      square1,
      square2,
      square3,
      square4,
      square5,
    ];
    player1.props.allShipsPlaced = true;

    render(component);

    const shipRight = screen.getByTestId('right');

    const shipDiv_1 = within(shipRight).getByTestId('1');
    const shipDiv_2 = within(shipRight).getByTestId('2');
    const shipDiv_3 = within(shipRight).getByTestId('3');
    const shipDiv_4 = within(shipRight).getByTestId('4');
    const shipDiv_5 = within(shipRight).getByTestId('5');

    expect(shipDiv_1).toBeInTheDocument();
    expect(shipDiv_2).toBeInTheDocument();
    expect(shipDiv_3).toBeInTheDocument();
    expect(shipDiv_4).toBeInTheDocument();
    expect(shipDiv_5).toBeInTheDocument();
  });

  it('will render a button with a hit image', () => {
    player1.board[1].isHit = true;

    render(component);

    const button = screen.getByTestId('1');
    const hitDiv = within(button).getByTestId('hit');

    expect(hitDiv).toBeInTheDocument();
  });

  it('will render a button with a miss image', () => {
    player1.board[1].isMiss = true;

    render(component);

    const button = screen.getByTestId('1');
    const missDiv = within(button).getByTestId('miss');

    expect(missDiv).toBeInTheDocument();
  });
});
