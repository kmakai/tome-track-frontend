import React from "react";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <div className="menu h-full w-1/2 absolute top-0 left-0  bg-slate-800 z-20 shadow-sm -translate-x-full transition-transform md:static md:translate-x-0 md:w-1/4">
      <ul className="menu-ul flex flex-col gap-4 p-4 text-white">
        <li>New Shelf</li>
        <hr />
        <li>
          <Link to="/">Home</Link>
        </li>
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
      </ul>
    </div>
  );
};

export default Menu;
