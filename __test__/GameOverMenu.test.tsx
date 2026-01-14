import { screen, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameOverMenu } from '~/components/GameOverMenu';

describe('GameOverMenu', () => {
  let component;

  beforeEach(() => {
    component = <GameOverMenu />;
  });

  it('has a container', () => {
    render(component);

    const dialogBox = screen.getByRole('dialog');
    expect(dialogBox).toBeInTheDocument();
  });
});
