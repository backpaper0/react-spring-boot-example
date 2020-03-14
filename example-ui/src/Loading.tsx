import React from 'react';

export interface LoadingProps {
  loaded: boolean;
  children: React.ReactNode;
}

function Loading({ loaded, children }: LoadingProps) {

  if (loaded === false) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      {React.Children.only(children)}
    </>
  );
}

export default Loading;

