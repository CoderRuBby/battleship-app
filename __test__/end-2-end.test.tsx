import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ButtonContainer } from '~/components/ButtonContainer';
import { Main } from '~/components/Main';
import { ShipButton } from '~/components/ShipButton';

describe('Layout', () => {
  let button1: React.ReactElement;
  let button2: React.ReactElement;
  let button3: React.ReactElement;
  let gameButtons: React.ReactElement;

  beforeEach(() => {
    button1 = (
      <ShipButton
        className='ship-button'
        testId='button1'
        buttonImg='button1.png'
        shipOnClick={() => {}}
      />
    );
    button2 = (
      <ShipButton
        className='ship-button'
        testId='button2'
        buttonImg='button2.png'
        shipOnClick={() => {}}
      />
    );
    button3 = (
      <ShipButton
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
    );
  });

  it('can render a container', () => {
    render(<Main />);

    const container = screen.getByRole('main');

    expect(container).toBeInTheDocument();
  });

  it('can render a button container with ship buttons', () => {
    render(<Main>{gameButtons}</Main>);

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
});
