import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { GlobalContext, useContext } from "../../constants/imports.jsx";
import Logout from "./Logout.jsx";

const Header = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { setLoginOpen, currentUser } = useContext(GlobalContext);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);
  return (
    <header className="flxBtw md:py-6 max-md:py-[0.76rem] max-md:px-3 md:px-4 max-w-[1010px] mx-auto">
      <Link to={"/"}>
        <div className="font-bold text-xl md:text-4xl">Studroom</div>
      </Link>
      {currentUser.isAuthenticated ? (
        <div className="relative flxRowStart items-center z-[99]">
          <ul className="flxRowStart items-center gap-5">
            <li>
              <Link
                className="flxRowStart items-center gap-1 cursor-pointer"
                to={"/my-rooms"}
              >
                <i className="fa-solid fa-house"></i>{" "}
                <p className="max-md:hidden">My rooms</p>
              </Link>
            </li>
            <li className="flxRowStart gap-1 cursor-pointer">
              <div>
                <i
                  onClick={() => {
                    setAccountOpen((prev) => !prev);
                  }}
                  className="fa-regular fa-user"
                ></i>

                <ul
                  className={`absolute bg-white -translate-x-1/2 p-2 shadow-xl rounded-lg transition duration-500 translate-y-3 ${
                    !accountOpen &&
                    "pointer-events-none opacity-0 translate-y-0"
                  } `}
                >
                  <li className="hover:text-blue-600 cursor-pointer">
                    Account
                  </li>
                  <Logout />
                </ul>
              </div>
              <p className="max-md:hidden">Hi {currentUser.username}</p>
            </li>
            <li></li>
          </ul>
        </div>
      ) : (
        <div className="flxRowCenter gap-2">
          {windowSize <= 768 ? (
            <Link to={"/register"} className={"hover:underline text-blue-600"}>
              Register
            </Link>
          ) : (
            <Link to={"/register"}>
              <Button name={"Register"} />
            </Link>
          )}

          <div className="md:hidden h-4/6 bg-black/60 w-[1px]"></div>
          {windowSize <= 768 ? (
            <Link
              onClick={() => {
                setLoginOpen(true);
              }}
              className={"hover:underline text-blue-600"}
            >
              Login
            </Link>
          ) : (
            <Link
              onClick={() => {
                setLoginOpen(true);
              }}
            >
              <Button name={"Login"} />
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
