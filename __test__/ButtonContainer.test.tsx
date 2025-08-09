import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ButtonContainer } from '~/components/ButtonContainer';
import { Button } from '~/components/Button';

describe('ButtonContainer', () => {
  let ButtonOne: React.ReactElement;
  let ButtonTwo: React.ReactElement;

  beforeEach(() => {
    ButtonOne = (
      <Button
        className='button'
        buttonImg='test.png'
        testId='button-one'
        shipOnClick={() => {}}
      />
    );
    ButtonTwo = (
      <Button
        className='button'
        buttonImg='test.png'
        testId='button-two'
        shipOnClick={() => {}}
      />
    );
  });

  it('can render a container', () => {
    render(<ButtonContainer />);

    const container = screen.getByRole('region');

    expect(container).toBeInTheDocument();
  });

  it('can render a ship button inside the container', () => {
    render(<ButtonContainer>{ButtonOne}</ButtonContainer>);

    const button = screen.getByTestId('button-one');

    expect(button).toBeInTheDocument();
  });

  it('can render multiple ship buttons inside the container', () => {
    render(<ButtonContainer>{[ButtonOne, ButtonTwo]}</ButtonContainer>);

    const buttonOne = screen.getByTestId('button-one');
    const buttonTwo = screen.getByTestId('button-two');

    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
  });
});
