import { AppComponent } from '~/components/AppComponent';
import gameBoard from '~/utils/gameBoard';
import ship from '~/utils/ship';
import type { shipInterface } from '~/utils/ship';
import type { gameBoardInterface } from '~/utils/gameBoard';

const makeShips = (): shipInterface[] => [
  ship('carrier', 5),
  ship('destroyer', 3),
  ship('submarine', 3),
  ship('battleship', 4),
  ship('cruiser', 2),
];

const createPlayer1 = (): gameBoardInterface => {
  const ships = makeShips();
  return gameBoard(ships);
};

const createPlayer2 = (): gameBoardInterface => {
  const ships = makeShips();
  return gameBoard(ships, true);
};

export function App() {
  return (
    <AppComponent
      player1Board={createPlayer1()}
      player2Board={createPlayer2()}
    />
  );
}
