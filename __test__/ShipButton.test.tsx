import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShipButton } from '~/components/ShipButton';

describe('ShipButton', () => {
  let onClick: () => void;

  beforeEach(() => {
    onClick = vi.fn();
  });

  it('will render a button with a button1.png background', () => {
    render(
      <ShipButton testId='button1' shipOnClick={onClick} isSelected={null} />,
    );

    const buttonElement = screen.getByTestId('button1');
    const style = getComputedStyle(buttonElement);

    expect(buttonElement).toBeInTheDocument();
    expect(style.backgroundImage).toContain('button1.png');
  });

  it('will call the onClick function when clicked', async () => {
    const user = userEvent.setup();

    render(
      <ShipButton testId='button' shipOnClick={onClick} isSelected='button' />,
    );

    const buttonElement = screen.getByTestId('button');
    await user.click(buttonElement);

    expect(onClick).toHaveBeenCalled();
  });

  it('will render a button with a highlightedbutton1.png background', () => {
    render(
      <ShipButton
        testId='button1'
        shipOnClick={onClick}
        isSelected='button1'
      />,
    );

    const buttonElement = screen.getByTestId('button1');
    const style = getComputedStyle(buttonElement);

    expect(style.backgroundImage).toContain('highlightedbutton1.png');
  });
});
