import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logOut } from "../features/userSlice";

const Menu: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
        <span className="text-white text-xl text-center p-2">{user?.name}</span>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user === null ? (
          <>
            <hr />

            <Link to="/login">
              <li className="border-2 border-white text-white rounded-md p-1">
                <button>Log In</button>
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
            <li>
              <Link to="/my-shelves">My Shelves</Link>
            </li>
            <Link to="/">
              <li className="border-2 border-white text-white rounded-md p-1 text-center">
                <button
                  onClick={() => {
                    dispatch(logOut());
                  }}
                  className="w-full"
                >
                  Log out
                </button>
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
