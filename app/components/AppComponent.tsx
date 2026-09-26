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

  const isWinningBg = () => {
    if (player1.props.winner === true) {
      return true;
    }
  };

  const isLosingBg = () => {
    if (player2.props.winner === true) {
      return true;
    }
  };

  const winningBgStyle =
    "portrait:bg-[url('/images/winning-menu-portrait-bg.png')] landscape:bg-[url('/images/winning-menu-landscape-bg.png')] landscape:bg-position-[20%] landscape:bg-size-[60rem_41rem] portrait:bg-cover";

  const losingBgStyle =
    "portrait:bg-[url('/images/losing-menu-portrait-bg.png')] landscape:bg-[url('/images/losing-menu-landscape-bg.png')] landscape:bg-position-[20%] landscape:bg-size-[60rem_41rem] portrait:bg-cover";

  const hologramBg = "bg-[url('/images/ship-container.svg')] bg-cover";

  return (
    <div
      className={`
        w-full h-screen overflow-hidden p-2
        flex flex-col justify-center items-center
        bg-no-repeat bg-cover bg-center
        bg-[url('/images/ship-control-room.png')]
        [@media(max-height:700px)]:justify-center

        md:bg-[url('/images/ship-control-room-lg.png')]
        md:portrait:bg-cover

        pointer-coarse:lg:landscape:bg-size-[103rem_70rem]
        pointer-coarse:xl:landscape:bg-size-[115rem_67rem]
        
        pointer-fine:md:landscape:bg-size-[95rem_67rem]
        pointer-fine:lg:landscape:bg-size-[104rem_60rem]
        pointer-fine:xl:landscape:bg-size-[120rem_62rem]
      `}
    >
      <div>
        <main
          className={`
            ${isWinningBg() ? winningBgStyle : isLosingBg() ? losingBgStyle : hologramBg}
            ${setBoardStyle()}
            
            relative flex flex-col justify-center items-center
            bg-no-repeat bg-center
            backdrop-blur-xs
            shadow-[0px_0px_8px_0px_rgba(44,255,255,.1),0px_19px_9px_1px_rgba(23,94,210,.3),0px_-3px_5px_3px_rgba(3,78,255,.3),0px_1px_7px_2px_rgba(33,255,255,.75)]

            portrait:p-2 portrait:xs:p-4 portrait:sm:p-5

            landscape:w-full landscape:gap-4 landscape:p-3
          
            lg:landscape:gap-8 landscape:xl:p-10
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
            portrait:gap-4 landscape:gap-8 landscape:xl:gap-15
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
