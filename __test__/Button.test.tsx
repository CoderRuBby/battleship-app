import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '~/components/Button';

describe('Button', () => {
  it('should render a button', () => {
    render(
      <Button
        className='ship-button'
        buttonImg='test.png'
        testId='test-button'
        shipOnClick={() => {}}
      />,
    );

    const button = screen.getByTestId('test-button');

    expect(button).toBeInTheDocument();
  });

  it('will call the onClick function when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button
        className='ship-button'
        buttonImg='test.png'
        testId='carrier'
        shipOnClick={onClick}
      />,
    );

    const button = screen.getByTestId('carrier');
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
