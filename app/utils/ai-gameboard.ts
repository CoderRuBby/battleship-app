import GameBoard from './gameboard-object';

class AiGameBoard extends GameBoard {
  constructor() {
    super();
  }

  assignShipStartPoint(square: number) {
    if (
      this.selectedShip !== 'none' &&
      this.isAvailableSquare(square) === true
    ) {
      this.selectedShip.addShipStart(square);
    }
  }
}

export default AiGameBoard;
