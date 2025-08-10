import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ButtonContainer } from '~/components/ButtonContainer';
import { App } from '~/layouts/App';
import { Button } from '~/components/Button';

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
      <Button
        className='ship-button'
        testId='button1'
        buttonImg='button1.png'
        shipOnClick={() => {}}
      />
    );
    button2 = (
      <Button
        className='ship-button'
        testId='button2'
        buttonImg='button2.png'
        shipOnClick={() => {}}
      />
    );
    button3 = (
      <Button
        className='ship-button'
        testId='button3'
        buttonImg='button3.png'
        shipOnClick={() => {}}
      />
    );
    gameButtons = (
      <ButtonContainer ariaLabel='The game ship buttons'>
        {[button1, button2, button3]}
      </ButtonContainer>
    );
    boardButton1 = (
      <Button
        className='board-button'
        testId='board1'
        buttonImg='board1.png'
        shipOnClick={() => {}}
      />
    );
    boardButton2 = (
      <Button
        className='board-button'
        testId='board2'
        buttonImg='board2.png'
        shipOnClick={() => {}}
      />
    );
    boardButton3 = (
      <Button
        className='board-button'
        testId='board3'
        buttonImg='board3.png'
        shipOnClick={() => {}}
      />
    );
    gameBoardButtons = (
      <ButtonContainer ariaLabel='The game board'>
        {[boardButton1, boardButton2, boardButton3]}
      </ButtonContainer>
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
