import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { ShipButtonComponent } from '~/components/ShipButtonComponent';
import type { shipInterface } from '~/utils/Ship';
import { ship } from '~/utils/Ship';

describe('ShipButtonComponent', () => {
  let carrier: shipInterface;
  let destroyer: shipInterface;
  let submarine: shipInterface;
  let buttons: shipInterface[];
  let component: React.ReactElement;

  beforeEach(() => {
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    submarine = ship('submarine', 3);
    buttons = [carrier, destroyer, submarine];

    component = (
      <ShipButtonComponent buttons={buttons} handleSelectShip={() => {}} />
    );
  });

  it('can render a button container with buttons', () => {
    render(component);

    const buttonContainer = screen.getByRole('region', {
      name: 'The ship buttons',
    });
    const buttonOne = screen.getByTestId('carrier');
    const buttonTwo = screen.getByTestId('destroyer');
    const buttonThree = screen.getByTestId('submarine');

    expect(buttonContainer).toBeInTheDocument();
    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
    expect(buttonThree).toBeInTheDocument();
  });

  test('only one button can be selected at a time', async () => {
    const user = userEvent.setup();

    render(component);

    const buttonOne = screen.getByTestId('carrier');
    const styleOne = getComputedStyle(buttonOne);

    expect(styleOne.background).toContain('url("carrier.png")');

    await user.click(buttonOne);

    const newStyleOne = getComputedStyle(buttonOne);

    expect(newStyleOne.background).toContain('url("highlightedcarrier.png")');

    const buttonTwo = screen.getByTestId('destroyer');
    const styleTwo = getComputedStyle(buttonTwo);

    expect(styleTwo.background).toContain('url("destroyer.png")');

    await user.click(buttonTwo);

    const newStyleTwo = getComputedStyle(buttonTwo);
    const buttonOneAgain = screen.getByTestId('carrier');
    const styleOneAgain = getComputedStyle(buttonOneAgain);

    expect(newStyleTwo.background).toContain('url("highlighteddestroyer.png")');
    expect(styleOneAgain.background).toContain('url("carrier.png")');
  });

  test('selecting the same button twice deselects it', async () => {
    const user = userEvent.setup();

    render(component);

    const buttonOne = screen.getByTestId('carrier');
    let style = getComputedStyle(buttonOne);

    await user.click(buttonOne);

    style = getComputedStyle(buttonOne);

    expect(style.background).toContain('url("highlightedcarrier.png")');

    await user.click(buttonOne);

    style = getComputedStyle(buttonOne);

    expect(style.background).toContain('url("carrier.png")');
  });
});
