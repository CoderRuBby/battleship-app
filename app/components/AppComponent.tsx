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
  allShips: shipInterface[];
  gameBoard: gameBoardInterface;
  ai: gameBoardInterface;
}

export function AppComponent({ allShips, gameBoard, ai }: appComponentProps) {
  const [playerGameBoard, setPlayerGameBoard] =
    useState<gameBoardInterface>(gameBoard);
  const [aiGameBoard, setAiGameBoard] = useState<gameBoardInterface>(ai);

  const { selectShip, getShipPaths, shipPlacementLogic } =
    shipPlacementSystem();

  const { placeShipOnGameBoard } = aiShipPlacementSystem();

  const { logic } = attack();

  const { aiAttackLogic } = aiAttack();

  const handleSelectShip = (shipName: shipInterface) => {
    const newBoard = { ...playerGameBoard };
    newBoard.props.selectedShip = selectShip(
      shipName,
      playerGameBoard.props.selectedShip,
    );
    setPlayerGameBoard(newBoard);
  };

  const isNumberInPaths = (id: number) => {
    const selectedShip = playerGameBoard.props.selectedShip!;
    const paths = getShipPaths(
      selectedShip.props.length,
      selectedShip.props.shipStartPoint!,
      playerGameBoard,
    );

    return paths.some((number) => number.array.includes(id));
  };

  const gameBoardOnClick = (id: number) => {
    if (playerGameBoard.props.allShipsPlaced === false) {
      if (
        playerGameBoard.props.selectedShip?.props.shipStartPoint &&
        isNumberInPaths(id) === false
      ) {
        return;
      }
      const newBoard = {
        ...shipPlacementLogic(id, playerGameBoard),
      };
      setPlayerGameBoard(newBoard);
    }

    if (
      playerGameBoard.props.allShipsPlaced === true &&
      aiGameBoard.props.allShipsPlaced === false
    ) {
      setAiGameBoard(placeShipOnGameBoard);
    }
  };

  const aiGameBoardOnClick = (id: number) => {
    // player attacks, setting opponents board
    const newAiBoard = logic(id, aiGameBoard);
    setAiGameBoard(newAiBoard);
    if (isLoser(newAiBoard)) {
      const newPlayerBoard = { ...playerGameBoard };
      newPlayerBoard.props.winner = true;
      setPlayerGameBoard(newPlayerBoard);
      return;
    }
    // ai attacks setting the players board
    const [num, obj] = aiAttackLogic(playerGameBoard);
    setPlayerGameBoard(obj);
    if (isLoser(obj)) {
      const newAiBoard = { ...aiGameBoard };
      newAiBoard.props.winner = true;
      setAiGameBoard(newAiBoard);
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
    setPlayerGameBoard((prevPlayerGameBoard) => {
      //! refactor: better readability
      const updatedBoard = [...prevPlayerGameBoard.board];
      if (
        updatedBoard[square]?.id !== id ||
        updatedBoard[square].ship !== null
      ) {
        updatedBoard[square] = {
          ...updatedBoard[square],
          imageNumber: index,
          imageDirection: direction,
        };
      }
      return {
        ...prevPlayerGameBoard,
        board: updatedBoard,
      };
    });
  };

  const handleMouseEnter = (id: number) => {
    if (playerGameBoard.props.selectedShip?.props.shipStartPoint !== null) {
      return;
    }

    const paths = getShipPaths(
      playerGameBoard.props.selectedShip!.props.length,
      id,
      playerGameBoard,
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
      playerGameBoard.props.selectedShip?.props.shipStartPoint !== null &&
      playerGameBoard.props.selectedShip?.props.shipEndPoint === null
    ) {
      return;
    }
    const newBoardObject = { ...playerGameBoard };
    newBoardObject.board.map((square) => {
      if (square.ship === null) {
        square.imageNumber = null;
        square.imageDirection = null;
      }
    });

    setPlayerGameBoard(newBoardObject);
  };

  const winnerLoserText = () => {
    if (playerGameBoard.props.winner === true) {
      return 'Win';
    } else {
      return 'Lose';
    }
  };

  const isThereAWinner = () => {
    if (
      playerGameBoard.props.winner === true ||
      aiGameBoard.props.winner === true
    ) {
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
      ship.props.shipStartPoint = 0;
      ship.props.shipEndPoint = 0;
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

    if (player === playerGameBoard) {
      setPlayerGameBoard(newPlayer);
    } else {
      setAiGameBoard(newPlayer);
    }
  };

  const resetGame = () => {
    resetPlayer(playerGameBoard);
    resetPlayer(aiGameBoard);
  };

  return (
    <main>
      {isThereAWinner() && (
        <GameOverMenu winLoseText={winnerLoserText()} resetGame={resetGame} />
      )}
      {!playerGameBoard.props.allShipsPlaced && (
        <ShipButtonComponent
          buttons={allShips}
          handleSelectShip={handleSelectShip}
        />
      )}
      {playerGameBoard.props.allShipsPlaced && (
        <GameBoardComponent
          board={aiGameBoard}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleOnClick={aiGameBoardOnClick}
          label='Ai Game Board'
        />
      )}
      <GameBoardComponent
        board={playerGameBoard}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleOnClick={gameBoardOnClick}
        label='The Game Board'
      />
    </main>
  );
}
