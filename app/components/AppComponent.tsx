import type { shipInterface } from '~/utils/ship';
import { ShipButtonComponent } from './ShipButtonComponent';
import { GameBoardComponent } from './GameBoardComponent';
import { useMemo, useState } from 'react';
import shipPlacementSystem from '~/utils/shipPlacementSystem';
import type { gameBoardInterface } from '~/utils/gameBoard';
import aiShipPlacementSystem from '~/utils/aiShipPlacementSystem';
import attack from '~/utils/attack';
import aiAttack from '~/utils/aiAttack';
import { GameOverMenu } from './GameOverMenu';
import { Legend } from './Legend';

export interface appComponentProps {
  player1Board: gameBoardInterface;
  player2Board: gameBoardInterface;
}

export function AppComponent({
  player1Board,
  player2Board,
}: appComponentProps) {
  const [player1, setPlayer1] = useState<gameBoardInterface>(player1Board);
  const [player2, setPlayer2] = useState<gameBoardInterface>(player2Board);
  const [hoverId, setHoverId] = useState<number | null>(null);

  const { getShipPaths, shipPlacementLogic } = useMemo(
    () => shipPlacementSystem(),
    [],
  );

  const { placeShipOnGameBoard } = useMemo(() => aiShipPlacementSystem(), []);

  const { logic } = useMemo(() => attack(), []);

  const { aiAttackLogic } = useMemo(() => aiAttack(), []);

  const handleSelectShip = (shipName: shipInterface) => {
    const newPlayer1 = { ...player1 };

    if (newPlayer1.props.selectedShip === shipName) {
      newPlayer1.props.selectedShip.props.shipStartPoint = null;
      newPlayer1.props.selectedShip = null;
    } else {
      newPlayer1.props.selectedShip = shipName;
    }

    setPlayer1(newPlayer1);
  };

  const isNumberInPaths = (id: number) => {
    const selectedShip = player1.props.selectedShip!;
    const paths = getShipPaths(
      selectedShip.props.length,
      selectedShip.props.shipStartPoint!,
      player1,
    );

    return paths.some((number) => number.array.includes(id));
  };

  const gameBoardOnClick = (id: number) => {
    if (
      player1.props.selectedShip?.props.shipStartPoint &&
      isNumberInPaths(id) === false
    ) {
      return;
    }
    if (
      player1.props.allShipsPlaced === false &&
      !player1.props.selectedShip?.props.shipStartPoint
    ) {
      const updatedPlayer1 = {
        ...shipPlacementLogic(id, player1),
      };

      setPlayer1(updatedPlayer1);
    }

    if (
      player1.props.selectedShip?.props.shipStartPoint &&
      player1.props.selectedShip.props.shipStartPoint !== id
    ) {
      let endPoint: number;
      const paths = getShipPaths(
        player1.props.selectedShip.props.length,
        player1.props.selectedShip.props.shipStartPoint!,
        player1,
      );

      for (let x = 0; x < paths.length; x++) {
        if (paths[x].array.includes(id)) {
          endPoint = paths[x].array[paths[x].array.length - 1];
          const updatedPlayer1 = {
            ...shipPlacementLogic(endPoint, player1),
          };
          setPlayer1(updatedPlayer1);
          break;
        }
      }
    }

    if (
      player1.props.allShipsPlaced === true &&
      player2.props.allShipsPlaced === false
    ) {
      setPlayer2(placeShipOnGameBoard);
    }
  };

  const aiGameBoardOnClick = (id: number) => {
    if (player2.board[id].isHit || player2.board[id].isMiss) {
      return;
    }

    // player attacks, setting opponents board
    const updatedPlayer2 = logic(id, player2);
    setPlayer2(updatedPlayer2);
    if (isLoser(updatedPlayer2)) {
      const updatedPlayer1 = { ...player1 };
      updatedPlayer1.props.winner = true;
      setPlayer1(updatedPlayer1);
      return;
    }
    // ai attacks setting the players board
    const [num, updatedPlayer1] = aiAttackLogic(player1);
    setPlayer1(updatedPlayer1);
    if (isLoser(updatedPlayer1)) {
      const updatedPlayer2 = { ...player2 };
      updatedPlayer2.props.winner = true;
      setPlayer2(updatedPlayer2);
      return;
    }
  };

  const isLoser = (board: gameBoardInterface) => {
    let lose = true;
    board.props.allShips.forEach((ship) => {
      if (!ship.props.sunk) {
        lose = false;
      }
    });

    return lose;
  };

  const handleMouseEnter = (id: number) => {
    if (
      player1.props.selectedShip &&
      player1.props.selectedShip.props.shipStartPoint !== null
    ) {
      return;
    }

    setHoverId(id);
  };

  const handleMouseLeave = () => {
    if (
      player1.props.selectedShip &&
      player1.props.selectedShip.props.shipStartPoint !== null &&
      player1.props.selectedShip.props.shipEndPoint === null
    ) {
      return;
    }

    setHoverId(null);
  };

  const winnerLoserText = () => {
    if (player1.props.winner === true) {
      return 'Win';
    } else {
      return 'Lose';
    }
  };

  const isThereAWinner = () => {
    if (player1.props.winner === true || player2.props.winner === true) {
      return true;
    } else {
      return false;
    }
  };

  const resetPlayer = (player: gameBoardInterface) => {
    const newPlayer = { ...player };
    const board = newPlayer.board.map((square) => {
      square.isHit = false;
      square.isMiss = false;
      square.ship = null;
      return square;
    });
    const ship = newPlayer.props.allShips.map((ship) => {
      ship.props.hit = 0;
      ship.props.sunk = false;
      ship.props.shipStartPoint = null;
      ship.props.shipEndPoint = null;
      ship.props.isPlaced = false;
      ship.props.placedLocations = [];
      ship.props.hitLocations = [];
      return ship;
    });
    newPlayer.board = board;
    newPlayer.props.allShips = ship;
    newPlayer.props.winner = false;
    newPlayer.props.allShipsPlaced = false;
    newPlayer.props.selectedShip = null;

    if (player === player1) {
      setPlayer1(newPlayer);
    } else {
      setPlayer2(newPlayer);
    }
  };

  const resetGame = () => {
    resetPlayer(player1);
    resetPlayer(player2);
  };

  const dblClick = (id: number) => {
    if (player1.props.allShipsPlaced && player2.props.allShipsPlaced) {
      return;
    }

    const newBoard = { ...player1 };
    const selectedShip = newBoard.props.selectedShip;
    const shipAtSquare = newBoard.board[id].ship;

    if (!newBoard.board[id].ship && selectedShip?.props.shipStartPoint !== id) {
      return;
    }

    if (shipAtSquare?.props.isPlaced === true) {
      if (selectedShip && selectedShip.props.shipStartPoint) {
        const startPoint = selectedShip.props.shipStartPoint;
        newBoard.board[startPoint].ship = null;
        selectedShip.props.shipStartPoint = null;
      }
      shipAtSquare.props.shipStartPoint = null;
      shipAtSquare.props.shipEndPoint = null;
      shipAtSquare.props.isPlaced = false;
      shipAtSquare.props.placedLocations = [];
      shipAtSquare.props.hitLocations = [];
      newBoard.board.forEach((square) => {
        if (square.ship === shipAtSquare) {
          square.ship = null;
        }
      });
      newBoard.props.selectedShip = shipAtSquare;
    }

    if (
      newBoard.props.selectedShip &&
      id === newBoard.props.selectedShip.props.shipStartPoint
    ) {
      newBoard.props.selectedShip.props.shipStartPoint = null;
    }

    setPlayer1(newBoard);
  };

  const setBoardStyle = () => {
    if (player1.props.allShipsPlaced && player2.props.allShipsPlaced) {
      return 'board-attack-stage';
    } else {
      return 'board-placement-stage';
    }
  };

  return (
    <div
      className={`
        w-full h-screen overflow-hidden
        flex flex-col justify-end items-center
        portrait:bg-[url('/images/ship-control-room.png')]
        landscape:bg-[url('/images/ship-control-room.png')]
        landscape:justify-center landscape:p-2
        bg-no-repeat bg-cover bg-center
        md:portrait:bg-cover md:portrait:bg-center
        md:landscape:bg-[url('/images/ship-control-room-lg.png')]
        md:portrait:bg-[url('/images/ship-control-room-lg.png')]
        lg:landscape:flex-row lg:landscape:items-end lg:landscape:p-0
      `}
    >
      {isThereAWinner() && (
        <GameOverMenu winLoseText={winnerLoserText()} resetGame={resetGame} />
      )}

      <div
        className="
        w-full portrait:h-52 overflow-visible
        flex flex-col portrait:justify-end items-center
        landscape:justify-center landscape:w-min
        portrait:bg-[url('/images/hologram-table-square.png')]
        bg-cover bg-position-[50%_6rem] bg-no-repeat
        xs:bg-position-[50%_0rem]
        sm:portrait:w-fit sm:portrait:p-30
        sm:portrait:bg-bottom sm:portrait:bg-contain
        md:portrait:p-35
        lg:portrait:p-50
        lg:landscape:bg-[url('/images/hologram-table-square.png')]
        lg:landscape:bg-bottom lg:landscape:bg-size-[64rem_15rem]
        lg:landscape:h-80 lg:landscape:w-max
        lg:landscape:p-48 lg:landscape:justify-end
        xl:landscape:p-52 xl:landscape:bg-size-[85rem_22rem]
        xl:landscape:w-screen
        "
      >
        <main
          className={`
          ${setBoardStyle()}
          relative flex bg-no-repeat flex-col
          landscape:w-full
          justify-center items-center
          portrait:mb-4
          portrait:p-4
          bg-[url('/images/ship-container.svg')]
          backdrop-blur-xs
          shadow-[0px_0px_8px_0px_rgba(44,255,255,.1),0px_19px_9px_1px_rgba(23,94,210,.3),0px_-3px_5px_3px_rgba(3,78,255,.3),0px_1px_7px_2px_rgba(33,255,255,.75)]
          landscape:bg-position-[20%]
          landscape:gap-4
          landscape:p-3
          portrait:bg-position-[50%]
          bg-size-[150rem_90rem]
          xs:portrait:mb-30
          sm:portrait:mb-3
          lg:landscape:gap-8
          lg:landscape:-mb-12
          xl:landscape:-mb-2
        `}
        >
          <div>
            {player1.props.allShipsPlaced && (
              <div className='hidden landscape:inline'>
                <Legend />
              </div>
            )}
          </div>
          <div
            className='
            flex portrait:flex-col justify-center items-center
            portrait:gap-4 landscape:gap-8
            '
          >
            {player1.props.allShipsPlaced && (
              <section
                className="
              player-boards flex items-center flex-col 
              bg-[url('/images/ship-container.svg')]
              bg-position-[10%]
              portrait:flex-row
            "
              >
                <GameBoardComponent
                  player={player2}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleOnClick={aiGameBoardOnClick}
                  label='Ai Game Board'
                  dblClick={() => {}}
                  hoverId={hoverId}
                />
              </section>
            )}
            {player1.props.allShipsPlaced && (
              <div className='landscape:hidden'>
                <Legend />
              </div>
            )}
            <section
              className="
              player-boards flex items-center flex-col
              bg-[url('/images/ship-container.svg')]
              bg-position-[10%]
              portrait:flex-row
            "
            >
              <GameBoardComponent
                player={player1}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleOnClick={gameBoardOnClick}
                label='The Game Board'
                dblClick={dblClick}
                hoverId={hoverId}
              />
            </section>
            {!player1.props.allShipsPlaced && (
              <ShipButtonComponent
                player={player1}
                handleSelectShip={handleSelectShip}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
