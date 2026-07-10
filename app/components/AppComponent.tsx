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
        mobile-background-image 
        flex justify-center items-center relative
        bg-[length:clamp(47rem,69rem,73rem)] bg-[position:50%_5px]
        bg-[url('/images/ship-control-room-mobile.png')]
        w-full h-screen bg-no-repeat
        md:bg-[length:97rem] md:bg-[position:50%_1px]
      `}
    >
      <div className='h-screen w-fit top-[5px] xs:top-[12px] absolute md:top-[420px] xl:mt-[-87px]'>
        <main
          className={`
          ${setBoardStyle()}
          relative h-[40rem]
          flex flex-col justify-center items-center
          bg-[url('/images/ship-container.svg')]
           shadow-[0px_0px_8px_0px_rgba(44,255,255,.1),0px_19px_9px_1px_rgba(23,94,210,.3),0px_-3px_5px_3px_rgba(3,78,255,.3),0px_1px_7px_2px_rgba(33,255,255,.75)]
          w-fit bg-[10%] backdrop-blur-[4px]
          md:h-[32rem] md:w-[750px] md:bg-[17%] md:flex-row md:gap-[clamp(1rem,25vw,4rem)]
        `}
        >
          {isThereAWinner() && (
            <GameOverMenu
              winLoseText={winnerLoserText()}
              resetGame={resetGame}
            />
          )}
          {player1.props.allShipsPlaced && (
            <section className='player-boards flex items-center flex-col'>
              <h2 className='board-text shadow-[0px_1px_.5px_0px_rgba(255,0,0,1)]'>
                Enemy Board
              </h2>
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
            <div className='flex gap-[35px] justify-center items-center md:absolute whitespace-nowrap md:top-[21px] md:text-[2rem] rounded-lg md:p-[6px] md:pl-[20px] md:pr-[20px] md:shadow-[0px_4px_79px_4px_rgba(0,0,0,1)_inset,0px_0px_8px_3px_rgba(0,0,0,1)]'>
              <div className='flex justify-center items-center gap-[3px] pl-[5px] pr-[5px]'>
                <h2>Miss = </h2>
                <img
                  src='/images/miss.png'
                  alt='miss'
                  className='w-[2rem] h-[2rem] md:w-[2.7rem] md:h-[2.7rem]'
                />
              </div>
              <div className='flex justify-center items-center gap-[3px] pl-[5px] pr-[5px]'>
                <h2>Hit = </h2>
                <img
                  src='/images/hit.png'
                  alt='hit'
                  className='w-[2rem] h-[2rem] md:w-[2.7rem] md:h-[2.7rem]'
                />
              </div>
            </div>
          )}
          <section className='player-boards flex items-center flex-col'>
            <h2 className='board-text shadow-[0px_1px_.5px_0px_rgba(0,255,2,1)]'>
              My Board
            </h2>
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
        </main>
      </div>
    </div>
  );
}
