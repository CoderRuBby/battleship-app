import { describe, it, expect, beforeEach } from 'vitest';
import { createPlayer1 } from './testData';

describe('GameBoard', () => {
  let player1: ReturnType<typeof createPlayer1>;
  let player2: ReturnType<typeof createPlayer1>;

  beforeEach(() => {
    player1 = createPlayer1();
    player2 = createPlayer1();
  });

  describe('isWinner', () => {
    it('will declare a winner if all ships are sunk', () => {
      player2.props.allShips[0].props.sunk = true;
      player2.props.allShips[1].props.sunk = true;
      player2.props.allShips[2].props.sunk = true;
      player2.props.allShips[3].props.sunk = true;
      player2.props.allShips[4].props.sunk = true;

      player1.isWinner(player2);

      expect(player1.props.winner).toBe(true);
    });
  });
});
