import React from "react";
import { GiSecretBook, GiHamburgerMenu } from "react-icons/gi";
import Menu from "./Menu";

const Header: React.FC = () => {
  return (
    <div className="bg-slate-700 text-white p-4 shadow-md flex justify-between items-center relative">
      <Menu />
      <h1 className="text-3xl font-bold flex items-center">
        <span className="mr-2">
          <GiSecretBook />{" "}
        </span>
        Tome Track
      </h1>

      <span className="text-3xl cursor-pointer">
        <GiHamburgerMenu />
      </span>
    </div>
  );
};

export default Header;
