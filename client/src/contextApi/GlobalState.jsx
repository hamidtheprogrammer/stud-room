import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { authenticateUser } from "../api/ApiCalls";
import { useQuery } from "@tanstack/react-query";

export const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const { data, isError } = useQuery({
    queryKey: ["authenticate"],
    queryFn: authenticateUser,
    retry: false,
  });

  const [loginOpen, setLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    isAuthenticated: false,
    userId: null,
    username: null,
  });

  useEffect(() => {
    currentUser.isAuthenticated &&
      setCurrentUser((prev) => ({
        ...prev,
        userId: data?.userId,
        username: data?.username,
      }));
  }, [data]);

  useEffect(() => {
    setCurrentUser((prev) => ({
      ...prev,
      isAuthenticated: !isError,
    }));
  }, [isError]);

  return (
    <GlobalContext.Provider
      value={{ loginOpen, setLoginOpen, currentUser, setCurrentUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
