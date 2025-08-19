import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '~/components/Button';

describe('Button', () => {
  let onClick: () => void;
  let button: React.ReactElement;
  let highlightedButton: React.ReactElement;

  beforeEach(() => {
    onClick = vi.fn();
    button = (
      <Button
        className='button'
        buttonImg='primary.png'
        testId='test-button'
        shipOnClick={onClick}
        isSelected={false}
        highlightedImg='highlighted.png'
      />
    );
    highlightedButton = (
      <Button
        className='button'
        buttonImg='primary.png'
        testId='test-button'
        shipOnClick={onClick}
        isSelected={true}
        highlightedImg='highlighted.png'
      />
    );
  });

  it('should render a button', () => {
    render(<>{button}</>);

    const buttonElement = screen.getByTestId('test-button');

    expect(buttonElement).toBeInTheDocument();
  });

  it('will call the onClick function when clicked', async () => {
    const user = userEvent.setup();

    render(<>{button}</>);

    const buttonElement = screen.getByTestId('test-button');
    await user.click(buttonElement);

    expect(onClick).toHaveBeenCalled();
  });

  it('will render a button with second background image', () => {
    render(<>{highlightedButton}</>);

    const buttonElement = screen.getByTestId('test-button');
    const style = getComputedStyle(buttonElement);

    expect(style.backgroundImage).toContain('highlighted.png');
  });
});
