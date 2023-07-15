import React from 'react';

import Login from "./Login";
import { useUserinfo } from "./WithUserinfo";

export interface AuthenticationProps {
  children: React.ReactNode;
}

function Authentication({ children }: AuthenticationProps) {

  const [userinfo] = useUserinfo();

  if (userinfo.name === "") {
    return (
      <Login />
    );
  }

  return (
    <>
      {React.Children.only(children)}
    </>
  );
}

export default Authentication;

