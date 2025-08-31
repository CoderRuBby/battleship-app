import React from 'react';
import { ShipButton } from './ShipButton';

export function ShipButtonComponent({
  ariaLabel,
  children,
}: {
  ariaLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      role='region'
      aria-label={ariaLabel}
      className='ship-button-container'
    >
      {React.Children.toArray(children).map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </section>
  );
}

export function ShipButtons() {
  const DestroyerButton = (
    <ShipButton
      className='ship-button'
      testId='destroyer-button'
      buttonImg='test.png'
      highlightedImg='test.png'
      isSelected={false}
      shipOnClick={() => {}}
    />
  );
  const BattleshipButton = (
    <ShipButton
      className='ship-button'
      testId='battleship-button'
      buttonImg='test.png'
      highlightedImg='test.png'
      isSelected={false}
      shipOnClick={() => {}}
    />
  );
  const CarrierButton = (
    <ShipButton
      className='ship-button'
      testId='carrier-button'
      buttonImg='test.png'
      highlightedImg='test.png'
      isSelected={false}
      shipOnClick={() => {}}
    />
  );
  const SubmarineButton = (
    <ShipButton
      className='ship-button'
      testId='Submarine-button'
      buttonImg='test.png'
      highlightedImg='test.png'
      isSelected={false}
      shipOnClick={() => {}}
    />
  );
  const CruiserButton = (
    <ShipButton
      className='ship-button'
      testId='destroyer-button'
      buttonImg='test.png'
      highlightedImg='test.png'
      isSelected={false}
      shipOnClick={() => {}}
    />
  );

  return (
    <ShipButtonComponent ariaLabel='The game ship buttons'>
      {[
        DestroyerButton,
        BattleshipButton,
        CarrierButton,
        SubmarineButton,
        CruiserButton,
      ]}
    </ShipButtonComponent>
  );
}
