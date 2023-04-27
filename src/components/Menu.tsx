import React from "react";

const Menu: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 translate-y-full bg-slate-800 z-20 -translate-x-full">
      <ul className="flex flex-col gap-4 p-4 ">
        <li>Search</li>
        <li>My Books</li>
        <li>Favorites</li>
        <li>Read Books</li>
        <li>Reading List</li>
      </ul>
    </div>
  );
};

export default Menu;
