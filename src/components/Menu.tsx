import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

const Menu: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const toggleMenu = (e: React.FormEvent) => {
    if ((e.target as HTMLElement).nodeName === "A") {
      const menu = document.querySelector(".menu");
      menu?.classList.toggle("-translate-x-full");
    }
  };
  return (
    <div className="menu h-full w-1/2 absolute top-0 left-0  bg-slate-800 z-20 shadow-sm -translate-x-full transition-transform md:static md:translate-x-0 md:w-1/4">
      <ul
        className="menu-ul flex flex-col gap-4 p-4 text-white"
        onClick={toggleMenu}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        {user === null ? (
          <>
            <hr />

            <Link to="/login">
              <li className="border-2 border-white text-white rounded-md p-1">
                Log In
              </li>
            </Link>
          </>
        ) : (
          <>
            <hr />
            <li>
              <Link to="/my-books">My Books</Link>
            </li>
            <li>
              <Link to="/my-books/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/my-books/read">Read Books</Link>
            </li>
            <li>
              <Link to="/my-books/reading">Reading Now</Link>
            </li>
            <hr />
            <li>My Shelves</li>
            <li>New Shelf</li>
            <Link to="/login">
              <li className="border-2 border-white text-white rounded-md p-1 text-center">
                Log out
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
