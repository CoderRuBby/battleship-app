import type { shipInterface } from '~/utils/ship';
import { ShipButtonComponent } from './ShipButtonComponent';
import { GameBoardComponent } from './GameBoardComponent';
import { useState } from 'react';
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

  const { getShipPaths, shipPlacementLogic } = shipPlacementSystem();

  const { placeShipOnGameBoard } = aiShipPlacementSystem();

  const { logic } = attack();

  const { aiAttackLogic } = aiAttack();

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
      player1.props.selectedShip?.props.shipStartPoint !== id
    ) {
      const updatedPlayer1 = {
        ...shipPlacementLogic(id, player1),
      };
      setPlayer1(updatedPlayer1);
    }

    if (
      player1.props.allShipsPlaced === true &&
      player2.props.allShipsPlaced === false
    ) {
      setPlayer2(placeShipOnGameBoard);
    }
  };

  const aiGameBoardOnClick = (id: number) => {
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
    const [num, obj] = aiAttackLogic(player1);
    setPlayer1(obj);
    if (isLoser(obj)) {
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

  const updateBoard = (
    id: number,
    square: number,
    index: number,
    direction: string,
  ) => {
    const newBoard = { ...player1 };
    if (
      newBoard.board[square]?.id !== id ||
      newBoard.board[square].ship !== null
    ) {
      newBoard.board[square].imageNumber = index;
      newBoard.board[square].imageDirection = direction;
    }

    setPlayer1(newBoard);
  };

  const handleMouseEnter = (id: number) => {
    if (player1.props.selectedShip?.props.shipStartPoint !== null) {
      return;
    }

    const paths = getShipPaths(
      player1.props.selectedShip!.props.length,
      id,
      player1,
    );
    if (paths) {
      paths.forEach((path) => {
        path.array.forEach((square, squareIndex) => {
          updateBoard(id, square, squareIndex, path.direction!);
        });
      });
    }
  };

  const handleMouseLeave = () => {
    if (
      player1.props.selectedShip?.props.shipStartPoint !== null &&
      player1.props.selectedShip?.props.shipEndPoint === null
    ) {
      return;
    }
    const updatedPlayer1 = { ...player1 };
    updatedPlayer1.board.map((square) => {
      if (square.ship === null) {
        square.imageNumber = null;
        square.imageDirection = null;
      }
    });

    setPlayer1(updatedPlayer1);
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
      square.imageDirection = null;
      square.imageNumber = null;
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
          square.imageDirection = null;
          square.imageNumber = null;
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

    newBoard.board.forEach((square) => {
      if (square.ship === null) {
        square.imageNumber = null;
        square.imageDirection = null;
      }
    });

    setPlayer1(newBoard);
  };

  return (
    <div className="bg-[center_top_2rem] bg-cover w-full h-screen bg-no-repeat bg-[url('/images/ship-control-room-mobile.png')] flex justify-center items-center">
      <div>
        <main className="h-142 w-90 bg-[10%] bg-[url('/images/ship-container.svg')] flex flex-col-reverse justify-center items-center gap-6 border-1 border-b-0 pl-8.5 pr-8.5 mb-70">
          {isThereAWinner() && (
            <GameOverMenu
              winLoseText={winnerLoserText()}
              resetGame={resetGame}
            />
          )}
          {!player1.props.allShipsPlaced && (
            <ShipButtonComponent
              player={player1}
              handleSelectShip={handleSelectShip}
            />
          )}
          {player1.props.allShipsPlaced && (
            <GameBoardComponent
              player={player2}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              handleOnClick={aiGameBoardOnClick}
              label='Ai Game Board'
              dblClick={() => {}}
            />
          )}
          <GameBoardComponent
            player={player1}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleOnClick={gameBoardOnClick}
            label='The Game Board'
            dblClick={dblClick}
          />
        </main>
      </div>
    </div>
  );
}
