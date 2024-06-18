import React from "react";
import { Footer, Header, Nav, Login } from "../constants/imports";
import { GlobalContext, useContext } from "../constants/imports";

const Layout = ({ children }) => {
  const { loginOpen } = useContext(GlobalContext);
  return (
    <div>
      <div
        className={`fixed z-[999] h-full w-full flxColCenter justify-center ${
          !loginOpen && "-translate-y-1/2 pointer-events-none opacity-0"
        } transition duration-500 bg-black/10 `}
      >
        <Login />
      </div>
      <Header />
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
