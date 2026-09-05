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
import { Legend } from './Legend/Legend';

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
    //! for testing purposes only, delete after game over menu is completed
    const player = { ...player1 };
    player.props.winner = true;
    setPlayer1(player);
    return;
    //!

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
        w-full h-screen overflow-hidden p-2
        flex flex-col justify-center items-center
        bg-no-repeat bg-cover bg-center
        bg-[url('/images/ship-control-room.png')]
        [@media(max-height:700px)]:justify-center

        portrait:justify-end portrait:p-0

        md:bg-[url('/images/ship-control-room-lg.png')]
        md:p-0
        md:portrait:bg-cover

        lg:landscape:justify-end

        pointer-coarse:lg:landscape:bg-size-[103rem_70rem]
        pointer-coarse:xl:landscape:bg-size-[115rem_67rem]
        
        pointer-fine:md:justify-end 
        pointer-fine:md:landscape:bg-size-[95rem_67rem]
        pointer-fine:lg:landscape:bg-size-[104rem_60rem]
        pointer-fine:xl:landscape:bg-size-[120rem_60rem]
      `}
    >
      <div
        className="
        w-full overflow-visible
        flex flex-col items-center
        bg-cover bg-position-[50%_6rem] bg-no-repeat
        [@media(max-height:700px)]:bg-none
        [@media(max-height:700px)]:justify-center
        [@media(max-height:700px)]:mb-0

        portrait:h-52 portrait:justify-end
        portrait:bg-[url('/images/hologram-table-square.png')]

        landscape:justify-center landscape:w-min
        
        xs:bg-position-[50%_0rem]

        sm:portrait:w-fit sm:portrait:p-30
        sm:portrait:bg-bottom sm:portrait:bg-contain

        md:portrait:p-35

        lg:portrait:p-50

        md:landscape:p-48 md:landscape:justify-end md:landscape:w-max
        md:landscape:bg-bottom md:landscape:bg-size-[64rem_15rem]

        lg:landscape:bg-[url('/images/hologram-table-square.png')]
        
        pointer-coarse:xl:landscape:p-52 
        pointer-coarse:xl:landscape:bg-size-[85rem_19rem]
        pointer-coarse:xl:landscape:w-screen
        
        pointer-fine:md:landscape:h-80 
        pointer-fine:md:landscape:w-fit
        pointer-fine:md:bg-[url('/images/hologram-table-square.png')]
        pointer-fine:md:landscape:bg-size-[57rem_15rem]
        pointer-fine:lg:landscape:bg-size-[63rem_15rem]
        pointer-fine:xl:landscape:bg-size-[80rem_17rem]
        pointer-fine:xl:landscape:p-55
        "
      >
        <main
          className={`
            ${setBoardStyle()}
            relative flex flex-col justify-center items-center
            bg-size-[150rem_90rem] bg-no-repeat
            backdrop-blur-xs min-h-164
            bg-[url('/images/ship-container.svg')]
            shadow-[0px_0px_8px_0px_rgba(44,255,255,.1),0px_19px_9px_1px_rgba(23,94,210,.3),0px_-3px_5px_3px_rgba(3,78,255,.3),0px_1px_7px_2px_rgba(33,255,255,.75)]
            [@media(max-height:700px)]:mb-0
            [@media(max-height:700px)]:landscape:min-w-160

          
            portrait:mb-4 portrait:p-4 portrait:min-w-85
            portrait:bg-position-[50%]
          
            landscape:w-full
            landscape:bg-position-[20%]
            landscape:gap-4
            landscape:p-3
          
            xs:portrait:mb-30
          
            sm:portrait:mb-3

            lg:landscape:gap-8
            lg:landscape:-mb-12

            pointer-fine:md:landscape:-mb-12
            pointer-fine:md:landscape:min-w-160
            pointer-fine:xl:landscape:min-w-218.75
            pointer-coarse:xl:landscape:-mb-7
          `}
        >
          {isThereAWinner() && (
            <GameOverMenu
              winLoseText={winnerLoserText()}
              resetGame={resetGame}
            />
          )}
          {!isThereAWinner() && (
            <div className='portrait:hidden'>
              <Legend />
            </div>
          )}
          <div
            className='
            flex portrait:flex-col justify-center items-center
            portrait:gap-4 landscape:gap-8
            '
          >
            {!player1.props.allShipsPlaced && (
              <ShipButtonComponent
                player={player1}
                handleSelectShip={handleSelectShip}
              />
            )}
            {player1.props.allShipsPlaced && !isThereAWinner() && (
              <GameBoardComponent
                player={player2}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleOnClick={aiGameBoardOnClick}
                label='Ai Game Board'
                dblClick={() => {}}
                hoverId={hoverId}
              />
            )}
            {!isThereAWinner() && (
              <div className='landscape:hidden'>
                <Legend />
              </div>
            )}

            {!isThereAWinner() && (
              <GameBoardComponent
                player={player1}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleOnClick={gameBoardOnClick}
                label='The Game Board'
                dblClick={dblClick}
                hoverId={hoverId}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
