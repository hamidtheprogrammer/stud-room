import React, { useEffect, useState } from "react";
import { NavItems } from "../../constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const currentLocation = useLocation().pathname;

  return (
    <div className="primaryBg text-white">
      <nav className="relative flxBtw w-full h-fit  max-w-[1010px] mx-auto">
        <div className="flxRowCenter">
          {NavItems.map(
            (nav, index) =>
              index < 4 && (
                <Link key={nav.name} className="nav-items" to={nav.link}>
                  {nav.name}
                  <div
                    className={`absolute h-[1rem] w-[1rem] transform rotate-45 translate-y-1/2 bg-white bottom-0  ${
                      currentLocation !== nav.link && "hidden"
                    }`}
                  ></div>
                </Link>
              )
          )}
        </div>
        <div className="flxRowCenter">
          {NavItems.map(
            (nav, index) =>
              index > 3 && (
                <Link
                  key={nav.name}
                  className={`nav-items ${index === 5 && "max-sm:hidden"}`}
                  to={nav.link}
                >
                  {nav.name}
                </Link>
              )
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
