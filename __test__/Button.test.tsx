import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '~/components/Button';

describe('Button', () => {
  let onClick: () => void;
  let button: React.ReactElement;

  beforeEach(() => {
    onClick = vi.fn();
    button = (
      <Button
        className='button'
        buttonImg='primary.png'
        testId='test-button'
        shipOnClick={onClick}
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
});
