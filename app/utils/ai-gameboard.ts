import GameBoard from './gameboard-object';
import Ship from './ship-object';

class AiGameBoard extends GameBoard {
  constructor() {
    super();
  }

  placeShip(ship: Ship, shipStartPoint: number, shipEndPoint: number) {
    this.placeShipOnGameBoard(ship, shipStartPoint, shipEndPoint);
  }
}

export default AiGameBoard;
