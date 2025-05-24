import { ShipButton } from '../components/ShipButton';
import { NewGameBoard } from '~/game-board-initialization';

export function ShipsLayout() {
  return (
    <section className='ship-container'>
      <ShipButton
        className='ship carrier'
        buttonImg='#'
        testId='carrier'
        shipOnClick={() => NewGameBoard.shipOnClick(NewGameBoard.Carrier)}
      />
      <ShipButton
        className='ship battleship'
        buttonImg='#'
        testId='battleship'
        shipOnClick={() => NewGameBoard.shipOnClick(NewGameBoard.Battleship)}
      />
      <ShipButton
        className='ship cruiser'
        buttonImg='#'
        testId='cruiser'
        shipOnClick={() => NewGameBoard.shipOnClick(NewGameBoard.Cruiser)}
      />
      <ShipButton
        className='ship submarine'
        buttonImg='#'
        testId='submarine'
        shipOnClick={() => NewGameBoard.shipOnClick(NewGameBoard.Submarine)}
      />
      <ShipButton
        className='ship destroyer'
        buttonImg='#'
        testId='destroyer'
        shipOnClick={() => NewGameBoard.shipOnClick(NewGameBoard.Destroyer)}
      />
    </section>
  );
}
