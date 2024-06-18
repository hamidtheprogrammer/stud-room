import React from "react";
import { NavItems } from "../../constants";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="primaryBg text-white flxRowCenter">
      {NavItems.map((nav) => (
        <Link
          key={nav.name}
          className="hover:bg-blue-900 h-full max-md:py-2 max-md:px-1 flex-1 text-nowrap"
          to={nav.link}
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
