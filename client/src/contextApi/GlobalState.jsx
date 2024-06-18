import React, { useState } from "react";
import { createContext } from "react";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ loginOpen, setLoginOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
