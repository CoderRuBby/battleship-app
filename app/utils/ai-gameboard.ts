import GameBoard from './gameboard-object';

class AiGameBoard extends GameBoard {
  constructor() {
    super();
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }
}

export default AiGameBoard;
