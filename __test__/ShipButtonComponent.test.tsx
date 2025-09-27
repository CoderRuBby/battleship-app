import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
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
});
