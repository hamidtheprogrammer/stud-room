import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { GlobalContext, useContext } from "../../constants/imports.jsx";

const Header = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { setLoginOpen } = useContext(GlobalContext);

  useEffect(() => {
    document.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
    console.log(windowSize);
  }, []);
  return (
    <header className="flxBtw max-md:py-3 max-md:px-3">
      <Link to={"/"}>
        <div className="font-bold text-2xl">Studroom</div>
      </Link>
      <div className="flxRowCenter gap-2">
        {windowSize <= 730 ? (
          <Link to={"/register"} className={"hover:underline text-blue-600"}>
            Register
          </Link>
        ) : (
          <Link to={"/register"}>
            <Button name={"Register"} />
          </Link>
        )}
        <div className="h-4/6 bg-black/60 w-[1px]"></div>
        {windowSize <= 730 ? (
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
    </header>
  );
};

export default Header;
