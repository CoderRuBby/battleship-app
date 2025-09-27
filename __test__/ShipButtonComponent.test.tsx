import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { ShipButtonComponent } from '~/components/ShipButtonComponent';

describe('ShipButtonComponent', () => {
  let buttons: string[];
  let component: React.ReactElement;

  beforeEach(() => {
    buttons = ['button1', 'button2', 'button3'];

    component = (
      <ShipButtonComponent
        ariaLabel='The game ship buttons'
        buttons={buttons}
      />
    );
  });

  it('can render a button container with buttons', () => {
    render(component);

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

  test('only one button can be selected at a time', async () => {
    const user = userEvent.setup();

    render(component);

    const buttonOne = screen.getByTestId('button1');
    const styleOne = getComputedStyle(buttonOne);

    expect(styleOne.background).toContain('url("button1.png")');

    await user.click(buttonOne);

    const newStyleOne = getComputedStyle(buttonOne);

    expect(newStyleOne.background).toContain('url("highlightedbutton1.png")');

    const buttonTwo = screen.getByTestId('button2');
    const styleTwo = getComputedStyle(buttonTwo);

    expect(styleTwo.background).toContain('url("button2.png")');

    await user.click(buttonTwo);

    const newStyleTwo = getComputedStyle(buttonTwo);
    const buttonOneAgain = screen.getByTestId('button1');
    const styleOneAgain = getComputedStyle(buttonOneAgain);

    expect(newStyleTwo.background).toContain('url("highlightedbutton2.png")');
    expect(styleOneAgain.background).toContain('url("button1.png")');
  });
});
