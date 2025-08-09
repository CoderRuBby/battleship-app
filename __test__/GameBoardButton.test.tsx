import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { GameBoardButton } from '~/components/GameBoardButton';

describe('GameBoardButton', () => {
  it('can render a button', () => {
    render(
      <GameBoardButton className='button' onClick={() => {}} testId='1' />,
    );

    const button = screen.getByTestId('1');

    expect(button).toBeInTheDocument();
  });

  it('will call the onClick function when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<GameBoardButton className='button' onClick={onClick} testId='1' />);

    const button = screen.getByTestId('1');
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
