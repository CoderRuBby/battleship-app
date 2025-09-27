import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { GameBoardButton } from '~/components/GameBoardButton';

describe('GameBoardButton', () => {
  it('will render a button', () => {
    render(<GameBoardButton />);
  });
});
