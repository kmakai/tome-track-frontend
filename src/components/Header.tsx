import React from "react";
import { GiSecretBook, GiHamburgerMenu } from "react-icons/gi";

const toggleMenu = () => {
  const menu = document.querySelector(".menu");
  menu?.classList.toggle("-translate-x-full");
};

const Header: React.FC = () => {
  return (
    <div className="bg-slate-700 text-white p-4 shadow-md flex justify-between items-center relative">
      <h1 className="text-3xl font-bold flex items-center">
        <span className="mr-2">
          <GiSecretBook />{" "}
        </span>
        Tome Track
      </h1>

      <span className="text-3xl cursor-pointer" onClick={toggleMenu}>
        <GiHamburgerMenu />
      </span>
    </div>
  );
};

export default Header;
