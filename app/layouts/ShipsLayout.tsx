import { ShipButton } from '../components/ShipButton';

export function ShipsLayout() {
  return (
    <section className='ship-container'>
      <ShipButton className='ship carrier' buttonImg='#' testId='carrier' />
      <ShipButton
        className='ship battleship'
        buttonImg='#'
        testId='battleship'
      />
      <ShipButton className='ship cruiser' buttonImg='#' testId='cruiser' />
      <ShipButton className='ship submarine' buttonImg='#' testId='submarine' />
      <ShipButton className='ship destroyer' buttonImg='#' testId='destroyer' />
    </section>
  );
}
