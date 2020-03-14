import React, { useState, useContext, useCallback } from 'react';

import { CsrfTokenContext } from "./WithCsrfToken";
import { UserinfoContext } from "./WithUserinfo";
import Login from "./Login";

export interface AuthenticationProps {
  children: React.ReactNode;
}

function Authentication({ children }: AuthenticationProps) {

  const [userinfo, refreshUserinfo] = useContext(UserinfoContext);

  if (userinfo.name === "") {
    return (
      <Login/>
    );
  }

  return (
    <>
      {React.Children.only(children)}
    </>
  );
}

export default Authentication;

