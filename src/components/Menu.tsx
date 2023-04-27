import React from "react";

const Menu: React.FC = () => {
  return (
    <div className="menu absolute top-0 left-0  bg-slate-800 z-20 shadow-sm -translate-x-full transition-transform">
      <ul className="flex flex-col gap-4 p-4 text-white">
        <li>New Shelf</li>
        <hr />
        <li>Home</li>
        <li>My Books</li>
        <li>Favorites</li>
        <li>Read Books</li>
        <li>Reading Now</li>
      </ul>
    </div>
  );
};

export default Menu;
