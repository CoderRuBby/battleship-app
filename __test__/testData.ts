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

export const createPlayer1 = (): gameBoardInterface => {
  const ships = makeShips();
  return gameBoard(ships);
};

export const createPlayer2 = (): gameBoardInterface => {
  const ships = makeShips();
  return gameBoard(ships, true);
};
