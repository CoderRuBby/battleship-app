import React from 'react';

export function ButtonContainer({ children }: { children?: React.ReactNode }) {
  return (
    <nav role='navigation' className='button-container'>
      {React.Children.toArray(children).map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </nav>
  );
}
