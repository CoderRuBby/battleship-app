import Ship from './Ship';

export default function GameBoard() {
  const gameBoard: {
    lose: boolean;
    selectedShip: null | Ship;
    allShipsPlaced: boolean;
    board: null | boardType;
  } = {
    lose: true,
    selectedShip: null,
    board: null,
    allShipsPlaced: false,
  };
  const Carrier: Ship = new Ship('carrier', 5);
  const Battleship: Ship = new Ship('battleship', 4);
  const Cruiser: Ship = new Ship('cruiser', 3);
  const Submarine: Ship = new Ship('submarine', 3);
  const Destroyer: Ship = new Ship('destroyer', 2);
  const allShips: Ship[] = [Battleship, Carrier, Cruiser, Destroyer, Submarine];

  const initialize = () => {
    const board: {
      [key: number]: {
        ship: Ship | null;
        isHit: boolean;
        isMiss: boolean;
      };
    } = {};

    for (let i = 0; i < 100; i++) {
      if (board) {
        board[i] = {
          ship: null,
          isHit: false,
          isMiss: false,
        };
      }
    }

    gameBoard.board = board;
  };

  const isLoser = () => {
    if (gameBoard)
      if (
        Battleship.sunk &&
        Carrier.sunk &&
        Submarine.sunk &&
        Destroyer.sunk &&
        Cruiser.sunk
      ) {
        gameBoard.lose = true;
      }
  };

  initialize();

  /*


  turn(square: number, opponent: GameBoard) {
    if (this.allShipsPlaced) {
      this.attack(opponent, square);
      this.isWinner(opponent);
    } else if (square) {
      this.shipPlacement(square);
    }
  }

  */

  return {
    allShips,
    gameBoard,
    isLoser,
  };
}
