import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ShipButtonComponent } from '~/components/ShipButtonComponent';
import { App } from '~/layouts/app';
import { ShipButton } from '~/components/ShipButton';

describe('App', () => {
  let button1: React.ReactElement;
  let button2: React.ReactElement;
  let button3: React.ReactElement;
  let gameButtons: React.ReactElement;
  let boardButton1: React.ReactElement;
  let boardButton2: React.ReactElement;
  let boardButton3: React.ReactElement;
  let gameBoardButtons: React.ReactElement;

  beforeEach(() => {
    button1 = (
      <ShipButton
        className='ship-button'
        testId='button1'
        buttonImg='button1.png'
        highlightedImg='test.png'
        isSelected={false}
        shipOnClick={() => {}}
      />
    );
    button2 = (
      <ShipButton
        className='ship-button'
        testId='button2'
        buttonImg='button2.png'
        highlightedImg='test.png'
        isSelected={false}
        shipOnClick={() => {}}
      />
    );
    button3 = (
      <ShipButton
        className='ship-button'
        testId='button3'
        buttonImg='button3.png'
        highlightedImg='test.png'
        isSelected={false}
        shipOnClick={() => {}}
      />
    );
    gameButtons = (
      <ShipButtonComponent ariaLabel='The game ship buttons'>
        {[button1, button2, button3]}
      </ShipButtonComponent>
    );
    boardButton1 = (
      <ShipButton
        className='board-button'
        testId='board1'
        buttonImg='board1.png'
        highlightedImg='test.png'
        isSelected={false}
        shipOnClick={() => {}}
      />
    );
    boardButton2 = (
      <ShipButton
        className='board-button'
        testId='board2'
        buttonImg='board2.png'
        highlightedImg='test.png'
        isSelected={false}
        shipOnClick={() => {}}
      />
    );
    boardButton3 = (
      <ShipButton
        className='board-button'
        testId='board3'
        buttonImg='board3.png'
        highlightedImg='test.png'
        isSelected={false}
        shipOnClick={() => {}}
      />
    );
    gameBoardButtons = (
      <ShipButtonComponent ariaLabel='The game board'>
        {[boardButton1, boardButton2, boardButton3]}
      </ShipButtonComponent>
    );
  });

  it('can render a container', () => {
    render(<App />);

    const container = screen.getByRole('main');

    expect(container).toBeInTheDocument();
  });

  it('can render a button container with ship buttons', () => {
    render(<App>{gameButtons}</App>);

    const buttonContainer = screen.getByRole('region', {
      name: 'The game ship buttons',
    });
    const buttonOne = screen.getByTestId('button1');
    const buttonTwo = screen.getByTestId('button2');
    const buttonThree = screen.getByTestId('button3');

    expect(buttonContainer).toBeInTheDocument();
    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
    expect(buttonThree).toBeInTheDocument();
  });

  it('can also render a game board container with board buttons', () => {
    render(<App>{[gameButtons, gameBoardButtons]}</App>);

    const buttonContainer = screen.getByRole('region', {
      name: 'The game board',
    });
    const buttonOne = screen.getByTestId('board1');
    const buttonTwo = screen.getByTestId('board2');
    const buttonThree = screen.getByTestId('board3');

    expect(buttonContainer).toBeInTheDocument();
    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
    expect(buttonThree).toBeInTheDocument();
  });
});
