import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { GameBoardButton } from '~/components/GameBoardButton';

describe('GameBoardButton', () => {
  it('will render a default button', () => {
    render(<GameBoardButton testId='button' />);

    const button = screen.getByTestId('button');
    const buttonStyle = getComputedStyle(button);

    expect(buttonStyle.background).toContain('rgba(0, 0, 0, 0)');
  });

  describe('during ship selection phase', () => {
    it('will have a ship background image on hover', async () => {
      const user = userEvent.setup();

      render(
        <GameBoardButton
          testId='button'
          selectedShip='button'
          shipImageNumber='1'
        />,
      );

      const button = screen.getByTestId('button');
      let style = getComputedStyle(button);

      expect(style.background).toContain('rgba(0, 0, 0, 0)');

      await user.hover(button);

      style = getComputedStyle(button);

      expect(style.background).toContain('url("button1.png")');
    });
  });
});
