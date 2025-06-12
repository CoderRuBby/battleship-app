import { describe, it, expect, beforeEach } from 'vitest';
import GamePlay from '~/utils/gameplay';
import GameBoard from '~/utils/gameboard-object';
import AiGameBoard from '~/utils/ai-gameboard';

describe('GamePlay', () => {
  let Ai: AiGameBoard;
  let Player: GameBoard;
  let Game: GamePlay;

  beforeEach(() => {
    Ai = new AiGameBoard();
    Player = new GameBoard();
    Game = new GamePlay(Player, Ai);
  });
  describe('turn', () => {
    it('can let both players place ships on gameboard', () => {
      Player.selectedShip = Player.Battleship;
      Game.turn(45);
      Game.turn(48);
      Player.selectedShip = Player.Carrier;
      Game.turn(34);
      Game.turn(38);
      Player.selectedShip = Player.Cruiser;
      Game.turn(77);
      Game.turn(79);
      Player.selectedShip = Player.Destroyer;
      Game.turn(20);
      Game.turn(21);
      Player.selectedShip = Player.Submarine;
      Game.turn(63);
      Game.turn(65);

      expect(Ai.allShipsPlaced).toBe(true);
      expect(Player.allShipsPlaced).toBe(true);
    });
  });
});
