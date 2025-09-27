import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GameBoardButton } from '~/components/GameBoardButton';

describe('GameBoardButton', () => {
  it('will render a default button', () => {
    render(
      <GameBoardButton
        testId='button'
        selectedShip={null}
        shipImageNumber={null}
      />,
    );

    const button = screen.getByTestId('button');
    const buttonStyle = getComputedStyle(button);

    expect(buttonStyle.background).toContain('rgba(0, 0, 0, 0)');
  });

  it('will render a button with a ship image', async () => {
    render(
      <GameBoardButton
        testId='button'
        selectedShip='button'
        shipImageNumber='1'
      />,
    );

    const button = screen.getByTestId('button');
    const style = getComputedStyle(button);

    expect(style.background).toContain('url("button1.png")');
  });
});
