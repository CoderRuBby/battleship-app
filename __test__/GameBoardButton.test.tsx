import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameBoardButton } from '~/components/GameBoardButton';
import ship from '~/utils/Ship';
import type { shipInterface } from '~/utils/Ship';
import gameBoard from '~/utils/GameBoard';
import type { gameBoardInterface } from '~/utils/GameBoard';

describe('GameBoardButton', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let battleship: shipInterface;
  let cruiser: shipInterface;
  let shipsArray: shipInterface[];
  let Player: gameBoardInterface;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    battleship = ship('battleship', 4);
    cruiser = ship('cruiser', 2);
    shipsArray = [carrier, destroyer, submarine, battleship, cruiser];
    Player = gameBoard(shipsArray);
  });

  it('will render a default button', () => {
    render(
      <GameBoardButton
        testId='button'
        board={Player}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
      />,
    );

    const button = screen.getByTestId('button');
    const buttonStyle = getComputedStyle(button);

    expect(buttonStyle.background).toContain('rgba(0, 0, 0, 0)');
  });

  it('will render a button with a ship image', async () => {
    Player.selectedShip = Player.allShips[0];
    Player.board[1].imageNumber = 1;
    Player.board[1].imageDirection = 'up';
    render(
      <GameBoardButton
        testId='1'
        board={Player}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
      />,
    );

    const button = screen.getByTestId('1');
    const style = getComputedStyle(button);

    expect(style.background).toContain('url("carrier1up.png")');
  });

  it('will render a button with a hit image', () => {
    Player.board[1].isHit = true;
    Player.selectedShip = Player.allShips[0];
    Player.board[1].imageNumber = 1;
    Player.board[1].imageDirection = 'up';
    render(
      <GameBoardButton
        testId='1'
        board={Player}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
      />,
    );

    const button = screen.getByTestId('1');
    const style = getComputedStyle(button);

    expect(style.background).toContain('url("hit.png")');
  });

  it('will render a button with a miss image', () => {
    Player.board[1].isMiss = true;
    Player.selectedShip = Player.allShips[0];
    Player.board[1].imageNumber = 1;
    Player.board[1].imageDirection = 'up';
    render(
      <GameBoardButton
        testId='1'
        board={Player}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        handleOnClick={() => {}}
      />,
    );

    const button = screen.getByTestId('1');
    const style = getComputedStyle(button);

    expect(style.background).toContain('url("miss.png")');
  });
});
