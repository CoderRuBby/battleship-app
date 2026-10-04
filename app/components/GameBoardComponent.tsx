import { useEffect, useRef, useState } from 'react';
import { BoardContainer } from './BoardContainer';
import { GameBoardButton } from './GameBoardButton';
import type { gameBoardInterface } from '~/utils/gameBoard';

interface GameBoardComponentProps {
  player: gameBoardInterface;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
  handleOnClick: (id: number) => void;
  label: string;
  dblClick: (id: number) => void;
  hoverId: number | null;
}

export function GameBoardComponent({
  player,
  handleOnClick,
  handleMouseEnter,
  handleMouseLeave,
  label,
  dblClick,
  hoverId,
}: GameBoardComponentProps) {
  const sunkShips = player.props.allShips.filter((ship) => ship.props.sunk);
  const [animateShipSunk, setAnimateShipSunk] = useState(false);
  const previousSunkCount = useRef(sunkShips.length);

  useEffect(() => {
    const hasNewSunkShip = sunkShips.length > previousSunkCount.current;
    previousSunkCount.current = sunkShips.length;

    if (hasNewSunkShip) {
      setAnimateShipSunk(true);
      const timer = setTimeout(() => setAnimateShipSunk(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [sunkShips.length]);

  const backgroundClass = () => {
    if (player.props.aiPlayer) {
      return 'ocean-2';
    } else return 'ocean-1';
  };

  return (
    <BoardContainer label={label}>
      <div
        className={`
        ${backgroundClass()} ${animateShipSunk && !player.props.aiPlayer ? 'animate-player-one-sunk' : animateShipSunk && player.props.aiPlayer && 'animate-player-two-sunk'}
        grid grid-cols-10 grid-rows-10 w-full h-full 
      `}
      >
        {player.board.map((square) => (
          <GameBoardButton
            key={square.id}
            testId={square.id.toString()}
            player={player}
            handleOnClick={handleOnClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            dblClick={dblClick}
            hoverId={hoverId}
          />
        ))}
      </div>
    </BoardContainer>
  );
}
