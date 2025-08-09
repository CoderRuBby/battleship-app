import React from 'react';

//!Add interface
export function ButtonContainer({
  ariaLabel,
  children,
}: {
  ariaLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <section role='region' aria-label={ariaLabel} className='button-container'>
      {React.Children.toArray(children).map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </section>
  );
}
