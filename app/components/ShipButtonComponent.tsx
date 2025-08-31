import React from 'react';

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
