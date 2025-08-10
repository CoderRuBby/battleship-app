import React from 'react';
export function App({ children }: { children?: React.ReactNode }) {
  return (
    <main>
      {React.Children.toArray(children).map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </main>
  );
}
