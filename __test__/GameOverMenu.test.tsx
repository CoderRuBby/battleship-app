import { screen, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameOverMenu } from '~/components/GameOverMenu';

describe('GameOverMenu', () => {
  const text = 'Win';
  let component: React.ReactElement;

  beforeEach(() => {
    component = <GameOverMenu winLoseText={text} />;
  });

  it('has a container', () => {
    render(component);

    const dialogBox = screen.getByRole('dialog');
    expect(dialogBox).toBeInTheDocument();
  });

  it('displays the winner/loser text', () => {
    render(component);

    const gameOverText = screen.getByRole('heading', { name: 'You ' + text });
    expect(gameOverText).toBeInTheDocument();
  });
});
